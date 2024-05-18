SELECT * FROM cargoes;
SELECT * FROM industries;
SELECT * FROM saves;
SELECT * FROM circles;
SELECT * FROM "industry_types";
SELECT * FROM "monthly_stats";
SELECT * FROM "stations";
SELECT * FROM "towns";
SELECT * FROM "signs";
SELECT * FROM "companies";

SELECT industries.name, industries.industry_type_id FROM "industries"
LEFT JOIN industry_types ON industry_types.id=industries.industry_type_id
WHERE industry_types.save_id=166

-- Show production for industries
SELECT monthly_stats.cargo_id, monthly_stats.industry_id, industries.name, monthly_stats.last_month_production, cargoes.name FROM "monthly_stats"
LEFT JOIN industries ON industries.id=monthly_stats.industry_id
LEFT JOIN cargoes ON monthly_stats.cargo_id=cargoes.id
WHERE monthly_stats.last_month_production > 0
ORDER BY monthly_stats.last_month_production

SELECT * FROM industry_types
LEFT JOIN cargoes ON cargoes.cargo_id 

-- Show cargos produced and accepted by industries types
SELECT * FROM "cargos_to_industry_types"
LEFT JOIN industry_types ON cargos_to_industry_types.industrytype_id=industry_types.id
LEFT JOIN cargoes ON cargos_to_industry_types.cargo_id=cargoes.id;



DELETE FROM cargos_to_industry_types WHERE cargo_id > 0;


ALTER TABLE cargoes
ADD COLUMN cargo_id INTEGER;
