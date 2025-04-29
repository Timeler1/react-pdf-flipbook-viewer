import { useEffect, useCallback, RefObject, Dispatch, SetStateAction } from 'react';
import { Button } from '../../button';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import keyboardjs from 'keyboardjs';
import Zoom from './zoom';
import SliderNav from './slider-nav/slider-nav';
import useScreenSize from './../../../hooks/use-screensize';
import Share from '../../share';
import React from 'react';
import { PDFDetails } from '../../../lib/definitions';
type ToolbarProps = {
    flipbookRef: any,
    containerRef: RefObject<HTMLDivElement | null>,
    screenfull: any,
    pdfDetails: PDFDetails,
    viewerStates: {
        currentPageIndex: number;
        zoomScale: number;
    },
    shareUrl: string | undefined,
    disableShare: boolean,
    setViewerStates: Dispatch<SetStateAction<{
        currentPageIndex: number;
        zoomScale: number;
    }>>
}
const Toolbar = ({ flipbookRef, containerRef, screenfull, pdfDetails, viewerStates, shareUrl, disableShare, setViewerStates }: ToolbarProps) => {
    const { width: screenWidth } = useScreenSize();
    const pagesInFlipView = ((viewerStates.currentPageIndex + 1) % 2 === 0 && (viewerStates.currentPageIndex + 1) !== pdfDetails.totalPages)
        ? `${(viewerStates.currentPageIndex + 1)} - ${viewerStates.currentPageIndex + 2}`
        : (viewerStates.currentPageIndex + 1)

    // Full screen >>>>>>>>>
    const fullScreen = useCallback(() => {
        if (screenfull.isEnabled) {
            screenfull.toggle(containerRef.current, { navigationUI: "hide" });
        }
        screenfull.on('error', (event: any) => {
            alert('Failed to enable fullscreen' + event);
        });
    }, [screenfull, containerRef]);

    // Keyboard shortcuts >>>>>>>>>
    useEffect(() => {
        const handleRight = () => flipbookRef.current.pageFlip().flipNext();
        const handleLeft = () => flipbookRef.current.pageFlip().flipPrev();

        keyboardjs.bind('right', null, handleRight);
        keyboardjs.bind('left', null, handleLeft);
        // keyboardjs.bind('f', null, fullScreen);

        return () => {
            keyboardjs.unbind('right', null, handleRight);
            keyboardjs.unbind('left', null, handleLeft);
            // keyboardjs.unbind('f', null, fullScreen);
        };
    }, [flipbookRef, fullScreen]);

    return (
        <div className="px-3 w-full bg-background">
            <SliderNav
                flipbookRef={flipbookRef}
                pdfDetails={pdfDetails}
                viewerStates={viewerStates}
                setViewerStates={setViewerStates}
            />
            <div className="flex items-center gap-2 pb-2 max-xl:pt-2">
                <div className="hidden lg:block flex-1"></div>
                <Button
                    onClick={() => { screenWidth < 768 ? flipbookRef.current.pageFlip().turnToPrevPage() : flipbookRef.current.pageFlip().flipPrev() }}
                    disabled={viewerStates.currentPageIndex === 0}
                    variant='secondary'
                    size='icon'
                    className='size-8 min-w-8'
                >
                    <ChevronLeft className="size-4 min-w-4" />
                </Button>
                <Button
                    onClick={() => { screenWidth < 768 ? flipbookRef.current.pageFlip().turnToNextPage() : flipbookRef.current.pageFlip().flipNext() }}
                    disabled={viewerStates.currentPageIndex === pdfDetails?.totalPages - 1 || viewerStates.currentPageIndex === pdfDetails?.totalPages - 2}
                    variant='secondary'
                    size='icon'
                    className='size-8 min-w-8'
                >
                    <ChevronRight className="size-4 min-w-4" />
                </Button>
                <Zoom zoomScale={viewerStates.zoomScale} screenWidth={screenWidth} />
                {!disableShare && <Share shareUrl={shareUrl} />}
                <Button
                    onClick={fullScreen}
                    variant='secondary'
                    size='icon'
                    className='size-8 min-w-8'
                >
                    {screenfull.isEnabled && screenfull.isFullscreen ?
                        <Minimize className="size-4 min-w-4" /> :
                        <Maximize className="size-4 min-w-4" />
                    }
                </Button>
                <div className="flex-1"></div>
                {pdfDetails?.totalPages > 0 && (
                    <p className='text-sm font-medium'>
                        {pagesInFlipView} of {pdfDetails?.totalPages}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Toolbar;
