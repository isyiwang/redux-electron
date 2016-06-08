

export default function objectUpdated(object1, object2) {
    let diff = {};

    Object.keys(object1).forEach((key) => {
        if (object1[key] === object2[key]) return;

        if (isObject(object1[key]) && isObject(object2[key])) {
            let deepDiff = objectUpdated(object1[key], object2[key]);
            if ( ! isEmpty(deepDiff)) {
                return diff[key] = deepDiff;
            }
        }

        diff[key] = object2[key];
    })

    return diff;
}

function isObject(value) {
    return (typeof value === 'object' && ! (value instanceof Array));
}

function isEmpty(value) {
    if (value == null) return true;
    if (value.length > 0) return false;
    if (Object.keys(value).length > 0) return false;

    return true;
}
