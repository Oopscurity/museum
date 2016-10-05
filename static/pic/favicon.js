const favicon = "data:image/png;base64,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";

export default favicon;
