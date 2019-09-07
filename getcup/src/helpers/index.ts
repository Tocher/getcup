export const deg2rad = angle => (angle / 180) * Math.PI;

export const rad2deg = angle => (angle * 180.0) / Math.PI;

export const getDayIndex = (date) => {
    const tempIndex = date.getDay() - 1;
    if (tempIndex < 0) {
        return 6;
    }

    return tempIndex;
};
