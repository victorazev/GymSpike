export default function scoreCalculator(
	horaInicio: string,
	horaFim: string,
): number {
	const [inicioHora, inicioMin] = horaInicio
		.split(':')
		.map(Number);
	const [fimHora, fimMin] = horaFim.split(':').map(Number);

	const totalInicio = inicioHora * 60 + inicioMin;
	const totalFim = fimHora * 60 + fimMin;

	const duration = totalFim - totalInicio;

	if (duration < 60) {
		return 50; // Menos de 1 hora
	} else if (duration <= 120) {
		return 100; // Entre 1 e 2 horas
	} else {
		return 150; // Mais de 2 horas
	}
}
