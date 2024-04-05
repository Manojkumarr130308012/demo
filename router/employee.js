const router = require('express').Router();
const employeeController = require('./../controller/employee');


router.post('/add', async (req, res) => {
	res.send(await employeeController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await employeeController.fetch(req.query.name));
});
router.get('/employeeById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await employeeController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await employeeController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await employeeController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;