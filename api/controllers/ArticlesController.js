/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async (req, res) => {
    try {
      const articles = await Articles.find({});
      res.view("pages/list", { articles });
    } catch (error) {
      res.send(500, { error: "Database Error" });
    }
  },
  add: (req, res) => {
    res.view("pages/add");
  },
  create: async (req, res) => {
    try {
      const title = req.body.title;
      const body = req.body.body;
      await Articles.create({ title: title, body: body });
      res.redirect("/articles/list");
    } catch (error) {
      res.send(500, { error: "Database Error" });
    }
  },
  delete: async (req, res) => {
    try {
      await Articles.destroy({ id: req.params.id });
      res.redirect("/articles/list");
    } catch (error) {
      res.send(500, { error: "Database Error" });
    }
  },
  edit: async (req, res) => {
    try {
      const article = await Articles.findOne({ id: req.params.id });
      res.view("pages/edit", { article });
    } catch (error) {
      res.send(500, { error: "Database Error" });
    }
  },
  update: async (req, res) => {
    try {
      const title = req.body.title;
      const body = req.body.body;

      await Articles.update(
        { id: req.params.id },
        { title: title, body: body }
      );
      res.redirect("/articles/list");
    } catch (error) {
      res.send(500, { error: "Database Error" });
    }
  },
};
