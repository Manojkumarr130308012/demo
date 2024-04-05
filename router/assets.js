const router = require('express').Router();
const assetsController = require('../controller/assets');


router.post('/add', async (req, res) => {
    res.send(await assetsController.add(req.body));
});


router.post('/issue_asset', async (req, res) => {
	res.send(await assetsController.issueStock(req.body));
});

router.post('/reurn_asset', async (req, res) => {
	res.send(await assetsController.returnStock(req.body));
});


router.get('/', async (req, res) => {
    res.send(await assetsController.fetch(req.query.name));
});

router.get('/issued_asset/', async (req, res) => {
    res.send(await assetsController.issuedAsset());
});

router.get('/return_asset/', async (req, res) => {
    res.send(await assetsController.returnAsset());
});

router.get('/obsolete_asset/', async (req, res) => {
    res.send(await assetsController.obsoleteAsset());
});

router.get('/assetsById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await assetsController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await assetsController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await assetsController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;