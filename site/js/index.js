function mostraRoteiro(roteiro) {
	const selector = '#conteudo';
	$(selector).empty();
	$(selector).append('<div class="spinner-border">');
	$.getJSON(`data/roteiro/${roteiro}.json`, function(data) {
		console.log(data);
		$(selector).empty();
		$(selector).append(`
			<h1>${data.nome}</h1>
		`);
		if (data.nota) {
			$(selector).append(`
				<div class="alert alert-info">
					${data.nota}
				</div>
			`);
		}
		for (const passo of data.passos) {
			mostraPasso(selector, passo);
		}
	});
}

function mostraPasso(selector, passo) {
	let html = '???';
	switch (passo.tipo) {
		case 'lista':
			html = '<ul>';
			for (const item of passo.itens) {
				html += `<li>${item}</li>`;
			}
			html += '</ul>';
			break;
		case 'titulo':
			html = `<h${passo.nivel + 1}>${passo.texto}</h${passo.nivel + 1}>`;
			break;
		default:
			console.log(`mostraPasso(): Tipo "${passo.tipo}" desconhecido.`)
			break;
	}
	$(selector).append(`
		<div>${html}</div>
	`);
}

window.onload = function() {
	const params = window.location.search.split(/\?|&/).filter((str) => str).map((str) => str.split('='));
	if (params.length > 0) {
		const roteiro = params.filter((arr) => arr[0] == 'roteiro')[0][1];
		mostraRoteiro(roteiro);
	}
}
