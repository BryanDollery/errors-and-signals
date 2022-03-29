const errorsAndSignals = disconnectHandler => {
  const errorTypes = ["unhandledRejection", "uncaughtException"];
  const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

  for (const type of errorTypes) {
    process.on(type, async () => {
      try {
        console.log({ type: "error", subtype: "unhandled", msg: `Exiting due to ${type}`, cause: type, level: "ERROR" });
        await disconnectHandler();
        process.exit(1);
      } catch (_) {
        process.exit(2);
      }
    });
  }

  for (const type of signalTraps) {
    process.once(type, async () => {
      try {
        console.log({ type: "signal", cause: type, msg: `Caught signal ${type}. Attempting graceful shutdown.`, level: "INFO" });
        if (disconnectionHandler) await disconnectHandler();
      } finally {
        console.log({ msg: `Processing signal ${type}. Killing process`, level: "INFO" });
        process.kill(process.pid, type);
      }
    });
  }
};

export { errorsAndSignals };
