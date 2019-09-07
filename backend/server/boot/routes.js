
module.exports = function(app) {

  app.remotes().before('**', (ctx, next) => {
    if (!ctx.req.accessToken) return next();

    app.models.user.findById(ctx.req.accessToken.userId, (err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('No user with this access token was found.'));
      ctx.user = user;
      next();
    });
  });
};
