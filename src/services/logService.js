import * as Sentry from "@sentry/react";
import config from "./config.json";
function init() {
  Sentry.init({
    dsn: config.sentryDsn,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
