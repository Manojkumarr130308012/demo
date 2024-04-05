const router = require('express').Router();
const branchController = require('./../controller/branch');


router.post('/add', async (req, res) => {
	res.send(await branchController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await branchController.fetch(req.query.name));
});
router.get('/branchById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await branchController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await branchController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await branchController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;