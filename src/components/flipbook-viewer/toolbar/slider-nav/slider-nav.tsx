import React from 'react';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import Slider from './slider';
import { PDFDetails } from '../../../../lib/definitions';

const SliderNav = ({ flipbookRef, pdfDetails, viewerStates, setViewerStates }: {
    flipbookRef: any, pdfDetails: PDFDetails, viewerStates: any, setViewerStates: Dispatch<SetStateAction<{
        currentPageIndex: number;
        zoomScale: number;
    }>>
}) => {
    const totalSlides = useMemo(() => pdfDetails?.totalPages % 2 === 0 ? pdfDetails?.totalPages / 2 + 1 : (pdfDetails?.totalPages - 1) / 2 + 1, [pdfDetails?.totalPages]);
    const currentSlide = Math.max(1, Math.min(totalSlides, Math.floor((viewerStates.currentPageIndex + 3) / 2)));
    // Turn to page number >>>>>>>>
    const onSlideChange = useCallback((slide: number) => {
        const newPageIndex = Math.max(0, (slide * 2) - 3);
        flipbookRef.current?.pageFlip()?.turnToPage(newPageIndex);
    }, [flipbookRef]);

    return (
        <Slider
            totalPages={pdfDetails?.totalPages}
            currentSlide={currentSlide}
            onSlideChange={onSlideChange}
            maxSlide={totalSlides}
        />
    );
}

export default SliderNav;