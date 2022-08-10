import { useCallback, useState } from 'react';

import { getPlantByID,} from 'shared/mocks';

export const usePlantLogic = () => {

    const [plant, setPlant] = useState<any>(undefined);

    const onGetPlantData = useCallback((id: string) => {
        const plant = getPlantByID(id);
        setPlant(plant);
    }, [setPlant, getPlantByID])

    return {
        plant,
        onGetPlantData,
    }
}