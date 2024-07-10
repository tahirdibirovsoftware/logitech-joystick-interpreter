class EngineInterpreter {
    private static readonly MIN_VALUE = 1000;
    private static readonly MAX_VALUE = 2000;
    private static readonly RANGE = EngineInterpreter.MAX_VALUE - EngineInterpreter.MIN_VALUE;
    private static readonly SCALE_FACTOR = EngineInterpreter.RANGE / 255;

    public engineInterpreter(data: Buffer): number {
        if (data.length < 6) {
            throw new Error('Buffer too short');
        }
        const engineData = data[5];
        return Math.round(EngineInterpreter.MAX_VALUE - EngineInterpreter.SCALE_FACTOR * engineData);
    }
}

export default new EngineInterpreter();
