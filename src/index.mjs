const errorsAndSignals = (disconnectHandler, ctx) => {
  const errorTypes = ["unhandledRejection", "uncaughtException"];
  const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

  for (const type of errorTypes) {
    process.on(type, async () => {
      try {
        console.log(JSON.stringify({ type: "error", subtype: "unhandled", msg: `Exiting due to ${type}`, cause: type, level: "ERROR", ctx }));
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
        console.log(JSON.stringify({ type: "signal", cause: type, msg: `Caught signal ${type}. Attempting graceful shutdown.`, level: "INFO", ctx }));
        if (disconnectionHandler) await disconnectHandler();
      } finally {
        console.log(JSON.stringify({ msg: `Processing signal ${type}. Killing process`, level: "INFO", ctx }));
        process.kill(process.pid, type);
      }
    });
  }
};

export { errorsAndSignals };
