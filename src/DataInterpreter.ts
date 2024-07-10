class DataInterpreter {
    private static readonly MIN_VALUE = 1000;
    private static readonly MAX_VALUE = 2000;
    private static readonly RANGE = DataInterpreter.MAX_VALUE - DataInterpreter.MIN_VALUE;
    private static readonly SCALE_FACTOR = DataInterpreter.RANGE / 255;

    public engineInterpreter(data: Buffer): number {
        if (data.length < 6) {
            throw new Error('Buffer too short');
        }
        const engineData = data[5];
        return DataInterpreter.MAX_VALUE - DataInterpreter.SCALE_FACTOR * engineData;
    }
}

export default new DataInterpreter();