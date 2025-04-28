import { memo } from 'react';
import { Page } from 'react-pdf';

const HoverItem = memo(({ slide, totalPages, totalSlides }: { slide: number, totalPages: number, totalSlides: number }) => {
    return (
        <div>
            <p className="text-xs text-background pb-1">
                Page {slide === 1 || (slide === totalSlides && totalPages % 2 === 0) ? slide * 2 - 2 || 1 : `${slide * 2 - 2}-${slide * 2 - 1}`}
            </p>
            <div className="flex rounded-md overflow-hidden">
                {Array.from({ length: totalPages }, (_, index) => {
                    if (index % 2 !== 0) {
                        return <Page
                            key={index}
                            pageNumber={index + 1}
                            width={110}
                            renderAnnotationLayer={false}
                            renderForms={false}
                            renderTextLayer={false}
                            _className={index + 1 === slide * 2 - 2 ? 'block' : 'hidden'}
                        />
                    } else {
                        return <Page
                            key={index}
                            pageNumber={index + 1}
                            width={110}
                            renderAnnotationLayer={false}
                            renderForms={false}
                            renderTextLayer={false}
                            _className={index + 1 === slide * 2 - 1 ? 'block' : 'hidden'}
                        />
                    }
                })}
            </div>
        </div>
    );
});

HoverItem.displayName = 'HoverItem';
export default HoverItem;
