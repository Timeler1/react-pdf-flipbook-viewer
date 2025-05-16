import { Dispatch, forwardRef, memo, SetStateAction, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import PdfPage from './pdf-page'
import { useDebounce } from './../../../hooks/use-debounce';
import useScreenSize from './../../../hooks/use-screensize';
import React from 'react';
import { PDFDetails } from '../../../lib/definitions';
const MemoizedPdfPage = memo(PdfPage)
type FlipbookLoaderProps = {
    pdfDetails: PDFDetails,
    scale: number,
    viewerStates: {
        currentPageIndex: number,
        zoomScale: number,
    },
    setViewerStates: Dispatch<SetStateAction<{
        currentPageIndex: number;
        zoomScale: number;
    }>>,
    viewRange: number[],
    setViewRange: Dispatch<SetStateAction<number[]>>
}
const FlipbookLoader = forwardRef<HTMLDivElement, FlipbookLoaderProps>(({ pdfDetails, scale, viewerStates, setViewerStates, viewRange, setViewRange }, ref) => {
    const { width } = useScreenSize();
    const debouncedZoom = useDebounce(viewerStates.zoomScale, 500);
    // Check if page is in View range or in view window >>>>>>>>
    const isPageInViewRange = (index: number) => { return index >= viewRange[0] && index <= viewRange[1] };
    const isPageInView = (index: number) => { return viewerStates.currentPageIndex === index || viewerStates.currentPageIndex + 1 === index };

    // Update pageViewRange on page flip >>>>>>>>
    const onFlip = useCallback((e: { data: number; }) => {
        let newViewRange: number[];
        if (e.data > viewerStates.currentPageIndex) {
            newViewRange = [viewRange[0], Math.max(Math.min(e.data + 4, pdfDetails.totalPages), viewRange[1])]
        } else if (e.data < viewerStates.currentPageIndex) {
            newViewRange = [Math.min(Math.max(e.data - 4, 0), viewRange[0]), viewRange[1]]
        } else {
            newViewRange = viewRange
        }
        setViewRange(newViewRange);
        setViewerStates(prev => ({
            ...prev,
            currentPageIndex: e.data,
        }));
    }, [viewerStates, viewRange, setViewRange, setViewerStates, pdfDetails.totalPages]);

    return (
        <div className="relative">
            {/*@ts-ignore*/}
            <HTMLFlipBook
                ref={ref}
                key={scale}
                startPage={viewerStates.currentPageIndex}
                width={pdfDetails.width * scale * 5}
                height={pdfDetails.height * scale * 5}
                size="stretch"
                drawShadow={false}
                flippingTime={700}
                usePortrait={false}
                showCover={true}
                showPageCorners={false}
                onFlip={onFlip}
                disableFlipByClick={width < 768 ? true : false}
                className={viewerStates.zoomScale > 1 ? 'pointer-events-none md:pointer-events-none' : ''}
            >
                {
                    Array.from({ length: pdfDetails.totalPages }, (_, index) => (
                        <MemoizedPdfPage
                            key={index}
                            height={pdfDetails.height * scale}
                            zoomScale={debouncedZoom}
                            page={index + 1}
                            isPageInViewRange={isPageInViewRange(index)}
                            isPageInView={isPageInView(index)}
                        />
                    ))
                }
            </HTMLFlipBook >
        </div>
    )
})

FlipbookLoader.displayName = 'FlipbookLoader'

export default FlipbookLoader