const Site = require('../models/Site');

const getSiteData = (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);

    // console.log(site[0].siteFooterInfo);
    // res.status(200).send(site[0].siteFooterInfo[0]);
    res.status(200).send(site[0].siteFooterInfo);
  });
};

const updateSiteData = (req, res) => {
  Site.findOneAndUpdate(
    { name: 'Site' },
    { $set: { siteFooterInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });

      res.status(200).send({
        success: true,
        siteFooterInfo: doc.siteFooterInfo
      });
    }
  );
};

module.exports = {
  getSiteData,
  updateSiteData
};
