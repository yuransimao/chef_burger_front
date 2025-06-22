export const formatarDuracao = (duracao: number) => {
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    
    if (horas > 0 && minutos > 0) {
        return `${horas}h ${minutos}min`;
    } else if (horas > 0) {
        return `${horas}h`;
    } else {
        return `${minutos}min`;
    }
};