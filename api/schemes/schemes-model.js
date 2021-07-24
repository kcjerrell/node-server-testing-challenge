let nextId = 1;
const schemes = loadData();

function loadData() {
	const data = [
		schemeBuilder('strawberry waffles', '#6f2206', '#a53e53', '#cdae88'),
		schemeBuilder('loam', '#7b493d', '#6d625f', '#8c9db4')
	]

	data[0].id = 1;
	data[1].id = 2;
	nextId = 3;

	return data;
}

function schemeBuilder(name, ...colors) {
	return {
		name,
		colors
	}
}

async function getAll() {
	return Promise.resolve(schemes);
}

async function getById(id) {
	const scheme = schemes.find(scheme => scheme.id === id);
	return Promise.resolve(scheme);
}

async function add(scheme) {
	scheme.id = nextId++;
	schemes.push(scheme);

	return Promise.resolve(scheme);
}

async function remove(id) {
	const index = schemes.findIndex(scheme => scheme.id === id);

	if (index >= 0)
		return schemes.splice(index, 1)[0];
	else
		return null;
}

module.exports = {
	schemeBuilder,
	getAll,
	getById,
	add,
	remove,
}
