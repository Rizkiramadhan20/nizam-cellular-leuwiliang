import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';

import { id } from 'date-fns/locale';

export const formatTimestamp = (timestamp: Timestamp | Date | undefined): string => {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return format(date, 'PPpp', { locale: id });
}; 