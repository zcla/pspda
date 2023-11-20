window.onload = function() {
	const params = window.location.search.split(/\?|&/).filter((str) => str).map((str) => str.split('='));
	if (params.length > 0) {
		const pagina = params.filter((arr) => arr[0] == 'pagina')[0][1];
		$(`#pagina_${pagina}`).show();
	}
}
