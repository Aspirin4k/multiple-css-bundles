function importAll(r) {
	r.keys().forEach(r);
}

importAll(require.context('./styles/themes', false, /\.pcss$/));