import {useCallback} from 'react'
export const UseAvailabilityStatus = () => {
    const renderAvailabilityStatus = useCallback((
        shouldCheckAvailability: boolean,
        isCheckingAvailability: boolean,
        availabilityError: any,
        disponibilidade: any
    ) => {
        if (!shouldCheckAvailability) return null;

        if (isCheckingAvailability) {
            return (
                <div className="text-sm text-gray-600">
                    Verificando disponibilidade...
                </div>
            );
        }

        if (availabilityError) {
            return (
                <div className="text-sm text-red-600">
                    Erro ao verificar disponibilidade
                </div>
            );
        }

        if (disponibilidade) {
            return (
                <div className={`text-sm ${disponibilidade.disponivel ? 'text-green-600' : 'text-red-600'}`}>
                    {disponibilidade.disponivel
                        ? '✓ Mesa disponível'
                        : '✗ Mesa não disponível neste horário'
                    }
                </div>
            );
        }

        return null;
    }, []);

    return { renderAvailabilityStatus };
};