const router = require('express').Router();
const assetsCategoryController = require('./../controller/asset_category');


router.post('/add', async (req, res) => {
    res.send(await assetsCategoryController.add(req.body));
});

router.get('/', async (req, res) => {
    res.send(await assetsCategoryController.fetch(req.query.name));
});
router.get('/assetsCategorybyId', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await assetsCategoryController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await assetsCategoryController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await assetsCategoryController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;