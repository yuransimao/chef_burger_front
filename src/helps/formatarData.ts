import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora);
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
};