export type ReadFunctionResult<T> = { data: T, nextBuffer: Buffer }
export type ReadFunction<T> = (inputBuffer: T, prev: object) => ReadFunctionResult<T>;

export function ExtractBOOL(inputBuffer: Buffer, prev: object): ReadFunctionResult<boolean> {
    let Value: boolean
    let OutputData: Buffer
    let RawBuffer: Buffer = inputBuffer.subarray(0, 1)
    if (RawBuffer[0] == 0) { Value = false }
    else { Value = true }
    OutputData = inputBuffer.subarray(1)
    return { data: Value, nextBuffer: OutputData }
}

export function ExtractUINT8(inputBuffer: Buffer, prev: object): ReadFunctionResult<number> {
    let Value: number
    let OutputData: Buffer
    Value = inputBuffer.subarray(0, 1).readInt8(0)
    OutputData = inputBuffer.subarray(1)
    return { data: Value, nextBuffer: OutputData }
}
export function ExtractUINT16(inputBuffer: Buffer, prev: object): ReadFunctionResult<number> {
    let Value: number
    let RawValue: Buffer
    let OutputData: Buffer
    RawValue = inputBuffer.subarray(0, 2)
    OutputData = inputBuffer.subarray(2)
    Value = RawValue.readUInt16LE(0)
    return { data: Value, nextBuffer: OutputData }
}
export function ExtractUINT32(inputBuffer: Buffer, prev: object): ReadFunctionResult<number> {
    let Value: number
    let RawValue: Buffer
    let OutputData: Buffer
    RawValue = inputBuffer.subarray(0, 4)
    OutputData = inputBuffer.subarray(4)
    Value = RawValue.readUInt32LE(0)
    return { data: Value, nextBuffer: OutputData }
}
export function ExtractUINT64(inputBuffer: Buffer, prev: object): ReadFunctionResult<bigint> {
    let Value: bigint
    let RawValue: Buffer
    let OutputData: Buffer
    RawValue = inputBuffer.subarray(0, 8)
    OutputData = inputBuffer.subarray(8)
    Value = RawValue.readBigUInt64LE(0)
    return { data: Value, nextBuffer: OutputData }
}
export function ExtractINT64(inputBuffer: Buffer, prev: object): ReadFunctionResult<bigint> {
    let Value: bigint
    let RawValue: Buffer
    let OutputData: Buffer
    RawValue = inputBuffer.subarray(0, 8)
    OutputData = inputBuffer.subarray(8)
    Value = RawValue.readBigInt64LE(0)
    return { data: Value, nextBuffer: OutputData }
}
export function ExtractSTRING(inputBuffer: Buffer, prev: object): ReadFunctionResult<string> {
    let Value: string
    let RawValue: Buffer
    let OutputData: Buffer
    RawValue = inputBuffer.subarray(0, inputBuffer.indexOf(0x00))
    OutputData = inputBuffer.subarray(inputBuffer.indexOf(0x00) + 1)
    Value = RawValue.toString()
    return { data: Value, nextBuffer: OutputData }
}

export function ExtractMoney(inputBuffer: Buffer, prev: any): ReadFunctionResult<bigint> {
    if (typeof prev.action === 'number' && prev.action === 6) {
        let Value: bigint
        let RawValue: Buffer
        let OutputData: Buffer
        RawValue = inputBuffer.subarray(0, 8)
        OutputData = inputBuffer.subarray(8)
        Value = RawValue.readBigUInt64LE(0)
        return { data: Value, nextBuffer: OutputData }
    } else {
        return { data: BigInt(0), nextBuffer: inputBuffer }
    }
}

export function ExtractFlag(inputBuffer: Buffer, prev: any): ReadFunctionResult<{id: number, name: number}[]> {
    let buffer = inputBuffer
    let result: {id: number, name: number}[] = []
    if (typeof prev.further === 'boolean' && prev.further) {
        let flag = prev.further;
        while (flag) {
            console.log(result)
            //Extract ID of DoCommand UINT16
            let {data: id, nextBuffer: next1} = ExtractUINT16(buffer, prev)
            let {data: name, nextBuffer: next2} = ExtractUINT16(next1, prev)
            let {data: nextflag, nextBuffer: next3} = ExtractBOOL(next2, prev)
            result.push({id: id, name: name})
            buffer = next3
            flag = nextflag
        }
    }
    return { data: result, nextBuffer: inputBuffer }
}