import classNames from "classnames";

function Skeleton({ times, className }) {
    const outerClassNames = classNames(
        'relative',
        'overflow-hidden',
        'bg-gray-300',
        'rounded',
        'mb-2.5',
        className  // this prop will enable us to set HEIGHT & WIDTH of the skeleton boxes
    );

    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-300',
        'via-white',
        'to-gray-300'
    );

    // the '_" means that WE DO NOT CARE ABOUT THAT ARGUMENT
    const boxes = Array(times).fill(0).map((_, i) => {
        return <div key={i} className={outerClassNames}>
            <div className={innerClassNames} />
        </div>
    })

    return boxes;
}

export default Skeleton;