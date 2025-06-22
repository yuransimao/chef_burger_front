export const getStatusColor = (status: string) => {
    switch (status) {
        case 'ATIVA':
        return 'bg-green-100 text-green-800 border-green-200';
        case 'CANCELADA':
        return 'bg-red-100 text-red-800 border-red-200';
        case 'FINALIZADA':
        return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
};

export const getStatusText = (status: string) => {
        switch (status) {
          case 'ATIVA':
            return 'Ativa';
          case 'CANCELADA':
            return 'Cancelada';
          case 'FINALIZADA':
            return 'Finalizada';
          default:
            return status;
        }
      };