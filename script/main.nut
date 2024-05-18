/*
 * This file is part of MinimalGS, which is a GameScript for OpenTTD
 * Copyright (C) 2012-2013  Leif Linse
 *
 * MinimalGS is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 2 of the License
 *
 * MinimalGS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MinimalGS; If not, see <http://www.gnu.org/licenses/> or
 * write to the Free Software Foundation, Inc., 51 Franklin Street,
 * Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

/** Import SuperLib for GameScript **/
import("util.superlib", "SuperLib", 36);
Result <- SuperLib.Result;
Log <- SuperLib.Log;
Helper <- SuperLib.Helper;
Tile <- SuperLib.Tile;
Direction <- SuperLib.Direction;
Town <- SuperLib.Town;
Industry <- SuperLib.Industry;
Story <- SuperLib.Story;
// Additional SuperLib sub libraries can be found here:
// http://dev.openttdcoop.org/projects/superlib/repository

/** Import other libs **/
// There are several other libraries for Game Scripts out there. Check out
// http://bananas.openttd.org/en/gslibrary/ for an up to date list.
//
// Remember to set dependencies in the bananas web manager for all libraries
// that you use. This way users will automatically get all libraries of the
// version you selected when they download your Game Script.


/** Import other source code files **/
require("version.nut"); // get SELF_VERSION
//require("some_file.nut");
//..


class MainClass extends GSController
{
	_loaded_data = null;
	_loaded_from_version = null;
	_init_done = null;

	/*
	 * This method is called when your GS is constructed.
	 * It is recommended to only do basic initialization of member variables
	 * here.
	 * Many API functions are unavailable from the constructor. Instead do
	 * or call most of your initialization code from MainClass::Init.
	 */
	constructor()
	{
		this._init_done = false;
		this._loaded_data = null;
		this._loaded_from_version = null;
	}
}

/*
 * This method is called by OpenTTD after the constructor, and after calling
 * Load() in case the game was loaded from a save game. You should never
 * return back from this method. (if you do, the script will crash)
 *
 * Start() contains of two main parts. First initialization (which is
 * located in Init), and then the main loop.
 */
function MainClass::Start()
{
	// Some OpenTTD versions are affected by a bug where all API methods
	// that create things in the game world during world generation will
	// return object id 0 even if the created object has a different ID.
	// In that case, the easiest workaround is to delay Init until the
	// game has started.
	if (Helper.HasWorldGenBug()) GSController.Sleep(1);

	this.Init();

	// Wait for the game to start (or more correctly, tell OpenTTD to not
	// execute our GS further in world generation)
	GSController.Sleep(1);

	// Game has now started and if it is a single player game,
	// company 0 exist and is the human company.

	// Main Game Script loop
	local last_loop_date = GSDate.GetCurrentDate();

	while (true) {
		local loop_start_tick = GSController.GetTick();

		// Handle incoming messages from OpenTTD
		this.HandleEvents();

		// Reached new year/month?
		local current_date = GSDate.GetCurrentDate();
		if (last_loop_date != null) {
			local year = GSDate.GetYear(current_date);
			local month = GSDate.GetMonth(current_date);
			if (year != GSDate.GetYear(last_loop_date)) {
				this.EndOfYear();
			}
			if (month != GSDate.GetMonth(last_loop_date)) {
				this.EndOfMonth();
			}
		}
		last_loop_date = current_date;

		local ticks_used = GSController.GetTick() - loop_start_tick;
		local days = 4;

		// Do not account for ticks used
		// GSController.Sleep(max(1, days * 74));

		// Account for tickets used
		GSController.Sleep(max(1, days * 74 - ticks_used));

		// this.LogCargoWaiting();

		// GSLog.Info("Sending message.");
		// local result = GSAdmin.Send({message = "tick"});
		// local myString = "Result " + result;
		// GSLog.Info(myString);

		// Loop with a frequency of five days
		// local ticks_used = GSController.GetTick() - loop_start_tick;
		// GSController.Sleep(max(1, 5 * 74 - ticks_used));
	}
}

function MainClass::LogCargoWaiting() {
	local stations = GSStationList(GSStation.STATION_ANY);
	local cargos = GSCargoList();
	GSLog.Info("# of found stations: " + stations.Count());
	local date = GSDate.GetCurrentDate();
	local day = GSDate.GetDayOfMonth(date);
	local month = GSDate.GetMonth(date);
	local year = GSDate.GetYear(date);

	local yearString = (year < 1000 ? "0" : "") + (year < 100 ? "0" : "") + (year < 10 ? "0" : "") + year.tostring();
	local monthString = (month < 10 ? "0" : "") + month.tostring();
	local dayString = (day < 10 ? "0" : "") + day.tostring();

	local datestring = yearString + "-" + monthString + "-" + dayString;

	foreach(s, _ in stations) {
		/* [ [cargo1, [ via, [from, amount ] ]], [cargo2, [ via, [from, amount ] ] ]] */
		local stationOutput = [];
		foreach(cargo, _c in cargos) {
			local cargoOutput = []
			if (!GSStation.HasCargoRating(s, cargo)) {
				continue;
			}
			local rating = GSStation.GetCargoRating(s, cargo);
			local waiting = GSStationList_CargoWaitingByVia(s, cargo);
			foreach (via_station_id, via_waiting_units in waiting) {
				local outputData = []
				local unaccounted = via_waiting_units;
				local waitingByOrigin = GSStationList_CargoWaitingViaByFrom(s, cargo, via_station_id)
				foreach (origin_station_id, origin_waiting_units in waitingByOrigin) {
					outputData.push([origin_station_id, origin_waiting_units])
					unaccounted = unaccounted - origin_waiting_units
				}
				if (unaccounted > 0) {
					outputData.push([via_station_id, unaccounted])
				}
				cargoOutput.push([via_station_id, outputData])
			}
			stationOutput.push([cargo, rating, cargoOutput])
		}
		local data = { id = s, date = datestring, cargos = stationOutput }
		local log = { datatype = 7, data = data}
		GSLog.Info("Waiting units of at " + GSBaseStation.GetName(s))
		GSLog.Info(log)
		GSAdmin.Send(log)
	}
	this.LogEnd(7);
}

/*
 * This method is called during the initialization of your Game Script.
 * As long as you never call Sleep() and the user got a new enough OpenTTD
 * version, all initialization happens while the world generation screen
 * is shown. This means that even in single player, company 0 doesn't yet
 * exist. The benefit of doing initialization in world gen is that commands
 * that alter the game world are much cheaper before the game starts.
 */
function MainClass::Init()
{
	if (this._loaded_data != null) {
		// Copy loaded data from this._loaded_data to this.*
		// or do whatever you like with the loaded data
	} else {
		// construct goals etc.
	}

	// Indicate that all data structures has been initialized/restored.
	this._init_done = true;
	this._loaded_data = null; // the loaded data has no more use now after that _init_done is true.
}

/*
 * This method handles incoming events from OpenTTD.
 */
function MainClass::HandleEvents()
{
	if(GSEventController.IsEventWaiting()) {
		local ev = GSEventController.GetNextEvent();
		if (ev == null) return;

		local ev_type = ev.GetEventType();
		switch (ev_type) {
			case GSEvent.ET_COMPANY_NEW: {
				local company_event = GSEventCompanyNew.Convert(ev);
				local company_id = company_event.GetCompanyID();

				// Here you can welcome the new company
				Story.ShowMessage(company_id, GSText(GSText.STR_WELCOME, company_id));
				break;
			}
			case GSEvent.ET_ADMIN_PORT: {
				local info = GSEventAdminPort.Convert(ev);
				local object = info.GetObject();
				GSLog.Info("Received request for " + object.request)
				this.HandleRequest(object);
				break;
			}
			default: {
				break;
			}
			// other events ...
		}
	}
	return;
}

function MainClass::HandleRequest(object)
{
	switch (object.request) {
		case 0: {
			this.LogCargo()
			break;
		}
		case 1: {
			this.LogIndustryType()
			break;
		}
		case 2: {
			this.LogIndustry()
			break;
		}
		case 3: {
			this.LogTown()
			break;
		}
		case 4: {
			this.LogStation()
			break;
		}
		case 5: {
			this.LogCompany(object.companyId)
			break;
		}
		case 6: {
			this.LogMonthlyStats();
			break;
		}
		case 7: {
			this.LogCargoWaiting();
			break;
		}
		default:  {
			break;
		}
	}
	return;
}

function MainClass::LogCargo()
{
	local cargos = GSCargoList();
	foreach(i, _ in cargos) {
		local result = {
			cargoId = i,
			name = GSCargo.GetName(i),
			label = GSCargo.GetCargoLabel(i),
			weight = GSCargo.GetWeight(i, 1),
			value = 0,
			isPass = GSCargo.HasCargoClass(i, GSCargo.CC_PASSENGERS),
			isM = GSCargo.HasCargoClass(i, GSCargo.CC_MAIL),
			isE = GSCargo.HasCargoClass(i, GSCargo.CC_EXPRESS),
			isA = GSCargo.HasCargoClass(i, GSCargo.CC_ARMOURED),
			isB = GSCargo.HasCargoClass(i, GSCargo.CC_BULK),
			isP = GSCargo.HasCargoClass(i, GSCargo.CC_PIECE_GOODS),
			isL = GSCargo.HasCargoClass(i, GSCargo.CC_LIQUID),
			isR = GSCargo.HasCargoClass(i, GSCargo.CC_REFRIGERATED),
			isH = GSCargo.HasCargoClass(i, GSCargo.CC_HAZARDOUS),
			isC = GSCargo.HasCargoClass(i, GSCargo.CC_COVERED),
			townEffect = GSCargo.GetTownEffect (i),
		};
		local log = { datatype = 0, data = result}
		GSAdmin.Send(log)
		GSLog.Info("Sent cargo with label" + GSCargo.GetCargoLabel(i))
		GSController.Sleep(2);
	}
	this.LogEnd(0);
	return;
}

function MainClass::LogIndustry()
{
	local inds = GSIndustryList();
	foreach(i, _ in inds)
	{
		local v = GSIndustry.IsValidIndustry(i);
		// local construction_date = GSIndustry.GetConstructionDate(i);
		local tile_index = GSIndustry.GetLocation(i);
		local result = {
			industryId = i,
			name = GSIndustry.GetName(i),
			construction_year = 0,
			construction_month = 0,
			construction_day = 0,
			// construction_year = GSDate.GetYear(construction_date),
			// construction_month = GSDate.GetMonth(construction_date),
			// construction_day = GSDate.GetDay(construction_date),
			industryTypeId = GSIndustry.GetIndustryType(i),
			x = GSMap.GetTileX(tile_index),
			y = GSMap.GetTileY(tile_index)
		}
		local log = { datatype = 2, data = result}
		GSAdmin.Send(log)
		GSLog.Info("Sent industry with name " + GSIndustry.GetName(i))
		GSController.Sleep(2);
	}
	this.LogEnd(2);
	return;
}

function MainClass::LogIndustryType()
{
	local types = GSIndustryTypeList ();
	foreach(t, _ in types)
	{
		local name = GSIndustryType.GetName(t);
		local produced = GSIndustryType.GetProducedCargo(t);
		local pa = []
		foreach(c, _c in produced)
		{
			pa.push(c)
		}
		local ac = []
		local accepted = GSIndustryType.GetAcceptedCargo(t);
		foreach(c, _c in accepted)
		{
			ac.push(c)
		}
		local result = {
			name = name,
			industryTypeId = t,
			hasHeliport = GSIndustryType.HasHeliport(t),
			hasDock = GSIndustryType.HasDock(t),
			accepts = ac,
			produces = pa
		}
		local log = { datatype = 1, data = result}
		GSAdmin.Send(log)
		GSLog.Info("Sent industry type " + name)
		GSController.Sleep(2);
	}
	this.LogEnd(1);
	return;
}

function MainClass::LogTown()
{
	local towns = GSTownList ();
	foreach(t, _ in towns)
	{
		local name = GSTown.GetName(t);
		local population = GSTown.GetPopulation(t);
		local tile_index = GSTown.GetLocation(t);
		local isCity = GSTown.IsCity(t);
		local result = {
			townId = t,
			name = name,
			population = population,
			isCity = isCity,
			x = GSMap.GetTileX(tile_index),
			y = GSMap.GetTileY(tile_index)
		}
		local log = { datatype = 3, data = result}
		GSAdmin.Send(log)
		GSLog.Info("Sent town " + name)
		GSController.Sleep(2);
	}
	this.LogEnd(3);
	return;
}

function MainClass::LogStation()
{
	local stations = GSStationList(GSStation.STATION_ANY);
	GSLog.Info("# of found stations: " + stations.Count())
	foreach(s, _ in stations) {
		local tile_index = GSBaseStation.GetLocation(s);
		local result = {
			stationId = s,
			name = GSBaseStation.GetName(s),
			companyId = GSStation.GetOwner(s),
			hasTra = GSStation.HasStationType(s, GSStation.STATION_TRAIN),
			hasTru = GSStation.HasStationType(s, GSStation.STATION_TRUCK_STOP ),
			hasB = GSStation.HasStationType(s, GSStation.STATION_BUS_STOP ),
			hasA = GSStation.HasStationType(s, GSStation.STATION_AIRPORT ),
			hasD = GSStation.HasStationType(s, GSStation.STATION_DOCK  ),
			hasAny = GSStation.HasStationType(s, GSStation.STATION_ANY 	),
			x = GSMap.GetTileX(tile_index),
			y = GSMap.GetTileY(tile_index)
		}
		local log = { datatype = 4, data = result}
		GSAdmin.Send(log)
		GSLog.Info("Sent station " + GSBaseStation.GetName(s))
		GSController.Sleep(2);
	}
	this.LogEnd(4);
}

function MainClass::LogCompany(companyId	)
{
	// Not useful; resort to admin event!

	// local passCargoId = 0;
	// foreach(cargo_id, cargo in GSCargo) {
    //     if(GSCargo.HasCargoClass(cargo_id, GSCargo.CC_PASSENGERS)) {
    //         passCargoId = cargo_id; // Get the CargoID for passengers
    //     }
    // }

	// local railVehicles = GSVehicleList(IsType, GSVehicle.VT_RAIL);
	// local roadVehicles = GSVehicleList(IsType, GSVehicle.VT_ROAD);
	// local buses = 0;
	// local trucks = 0;

	// foreach(v, _ in roadVehicles)
	// {
	// 	if (GSVehicle.GetCapacity(v, passCargoId) > 0)
	// 	{
	// 		buses += 1;
	// 	}
	// 	else
	// 	{
	// 		trucks += 1;
	// 	}
	// }
	// local waterVehicles = GSVehicleList(IsType, GSVehicle.VT_WATER);
	// local airVehicles = GSVehicleList(IsType, GSVehicle.VT_INVALID);
	// local result = {
	// 	trains = railVehicles.Count(),
	// 	lorries = trucks,
	// 	buses = buses,
	// 	ships = waterVehicles.Count(),
	// 	planes = airVehicles.Count(),
	// 	managerName = GSCompany.GetPresidentName (companyId),
	// 	name = GSCompany.GetName (companyId),
	// 	primary = GSCompany.GetPrimaryLiveryColour(GSCompany.LS_DEFAULT),
	// 	secondary = GSCompany.GetSecondaryLiveryColour(GSCompany.LS_DEFAULT),
	// 	companyId = companyId,
	// }
}

function MainClass::LogMonthlyStats()
{
	local inds = GSIndustryList();
	local now = GSDate.GetCurrentDate();
	local month = GSDate.GetMonth(now);
	local year = GSDate.GetYear(now);
	foreach(i, _ in inds)
	{
		local t = GSIndustry.GetIndustryType(i);
		local produced = GSIndustryType.GetProducedCargo(t);
		local pa = []
		foreach(c, _c in produced)
		{
			local prod = [
				GSIndustry.GetStockpiledCargo(i, c),
				GSIndustry.GetLastMonthProduction(i, c),
				GSIndustry.GetLastMonthTransported(i, c),
				GSIndustry.GetLastMonthTransportedPercentage(i, c),
			]
			pa.push({cargoId = c, stats = prod})
		}
		local result = {
			industryId = i,
			monthlystats = pa,
			month = month,
			year = year,
		}
		local log = { datatype = 6, data = result}
		GSAdmin.Send(log)
		GSLog.Info("Sent industry with name " + GSIndustry.GetName(i))
		GSController.Sleep(2);
	}
	this.LogEnd(6);
}

function MainClass::LogEnd(datatype) {
	GSAdmin.Send({datatype=datatype, end=true})
}

/*
 * Called by our main loop when a new month has been reached.
 */
function MainClass::EndOfMonth()
{
	GSLog.Info("GSLog reached end of month!");
	local result = GSAdmin.Send({message = "GSADMIN reached end of month!"});
	GSLog.Info("Result " + result);
}

/*
 * Called by our main loop when a new year has been reached.
 */
function MainClass::EndOfYear()
{
	GSLog.Info("GSLog reached end of year!");
	local result = GSAdmin.Send({message = "GSADMIN reached end of year!"});
	GSLog.Info("Result " + result);
}

/*
 * This method is called by OpenTTD when an (auto)-save occurs. You should
 * return a table which can contain nested tables, arrays of integers,
 * strings and booleans. Null values can also be stored. Class instances and
 * floating point values cannot be stored by OpenTTD.
 */
function MainClass::Save()
{
	Log.Info("Saving data to savegame", Log.LVL_INFO);

	// In case (auto-)save happens before we have initialized all data,
	// save the raw _loaded_data if available or an empty table.
	if (!this._init_done) {
		return this._loaded_data != null ? this._loaded_data : {};
	}

	return {
		some_data = null,
		//some_other_data = this._some_variable,
	};
}

/*
 * When a game is loaded, OpenTTD will call this method and pass you the
 * table that you sent to OpenTTD in Save().
 */
function MainClass::Load(version, tbl)
{
	Log.Info("Loading data from savegame made with version " + version + " of the game script", Log.LVL_INFO);

	// Store a copy of the table from the save game
	// but do not process the loaded data yet. Wait with that to Init
	// so that OpenTTD doesn't kick us for taking too long to load.
	this._loaded_data = {}
   	foreach(key, val in tbl) {
		this._loaded_data.rawset(key, val);
	}

	this._loaded_from_version = version;
}
