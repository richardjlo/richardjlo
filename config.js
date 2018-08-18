module.exports.get = function(env) {
  // Run environment-specific commands.
  if (env == 'production') {
  } else {
    require('dotenv').config();
  }

  //  Generate env variables based on environment
  let config = {
    production: {
      mode: 'Production',
    },
    default: {
      mode: 'Development',
    },
  };

  return config[env] || config.default;
};
