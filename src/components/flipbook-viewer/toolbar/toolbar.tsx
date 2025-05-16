import { useEffect, useCallback, RefObject, Dispatch, SetStateAction } from 'react';
import { Button } from '../../button'; // Assuming this path is correct
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import Zoom from './zoom'; // Assuming this component is compact
import SliderNav from './slider-nav/slider-nav'; // Assuming this component is compact or its height is managed
import useScreenSize from './../../../hooks/use-screensize';
import Share from '../../share'; // Uses SimpleDropdown with z-index: 50
import React from 'react';
import { PDFDetails } from '../../../lib/definitions';

type ToolbarProps = {
    flipbookRef: any, // Consider typing this if possible: React.RefObject<YourFlipbookInstanceType>
    containerRef: RefObject<HTMLDivElement | null>,
    screenfull: any, // Consider typing or replacing with native API for more control
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

const Toolbar = ({
    flipbookRef,
    containerRef,
    screenfull,
    pdfDetails,
    viewerStates,
    shareUrl,
    disableShare,
    setViewerStates
}: ToolbarProps) => {
    const { width: screenWidth } = useScreenSize();

    // Determine current page display string
    const isTwoPageSpread = viewerStates.currentPageIndex > 0 && // Not the very first page (which is often a single cover)
        (viewerStates.currentPageIndex + 1) < pdfDetails.totalPages && // Not the very last page if it's single
        screenWidth >= 768; // Example: Consider two-page spread only on larger screens

    let pagesInFlipViewDisplay: string;
    if (isTwoPageSpread && viewerStates.currentPageIndex % 2 !== 0) { // If current page index is odd, it's the left page of a spread
        pagesInFlipViewDisplay = `${viewerStates.currentPageIndex + 1}-${viewerStates.currentPageIndex + 2}`;
    } else {
        pagesInFlipViewDisplay = `${viewerStates.currentPageIndex + 1}`;
    }


    // Full screen toggle
    const fullScreen = useCallback(() => {
        if (screenfull && screenfull.isEnabled && containerRef.current) {
            screenfull.toggle(containerRef.current, { navigationUI: "hide" }).catch((err: any) => {
                // More user-friendly error handling could be implemented here
                console.error('Failed to toggle fullscreen:', err);
                alert('Failed to enable fullscreen. Your browser might not support it or it was blocked.');
            });
        } else if (screenfull && !screenfull.isEnabled) {
            alert('Fullscreen is not available in this browser or context.');
        }
    }, [screenfull, containerRef]);

    // Keyboard shortcuts for navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!flipbookRef.current || !flipbookRef.current.pageFlip) return;

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                flipbookRef.current.pageFlip().flipNext();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                flipbookRef.current.pageFlip().flipPrev();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [flipbookRef]); // Dependency: flipbookRef

    const canFlipPrev = viewerStates.currentPageIndex > 0;
    const canFlipNext = viewerStates.currentPageIndex < pdfDetails.totalPages - 1;


    return (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-background shadow-lg z-40 p-2 print:hidden">
            {/* Slider Navigation Row */}
            <div className="mb-1">
                <SliderNav
                    flipbookRef={flipbookRef}
                    pdfDetails={pdfDetails}
                    viewerStates={viewerStates}
                    setViewerStates={setViewerStates}
                />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-x-1 sm:gap-x-2">
                {/* Left Section: Page numbers (more detailed on larger screens) */}
                <div className="hidden md:flex items-center flex-shrink-0 min-w-[100px]"> {/* min-width to prevent squishing */}
                    {pdfDetails?.totalPages > 0 && (
                        <p className='text-xs font-medium text-muted-foreground whitespace-nowrap'>
                            Page {pagesInFlipViewDisplay} of {pdfDetails?.totalPages}
                        </p>
                    )}
                </div>
                {/* Invisible spacer to balance when left section is hidden */}
                <div className="md:hidden flex-shrink-0 min-w-[100px]"></div>


                {/* Center Section: Navigation controls & compact page numbers */}
                <div className="flex-grow flex items-center justify-center gap-1 sm:gap-2">
                    <Button
                        onClick={() => {
                            if (flipbookRef.current?.pageFlip) {
                                screenWidth < 768 ? flipbookRef.current.pageFlip().turnToPrevPage() : flipbookRef.current.pageFlip().flipPrev()
                            }
                        }}
                        disabled={!canFlipPrev}
                        variant='secondary'
                        size='icon'
                        className='size-8 min-w-8'
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="size-4 min-w-4" />
                    </Button>

                    {/* Compact page numbers for smaller than md screens */}
                    <div className="md:hidden">
                        {pdfDetails?.totalPages > 0 && (
                            <p className='text-xs font-medium text-muted-foreground whitespace-nowrap'>
                                {pagesInFlipViewDisplay}/{pdfDetails?.totalPages}
                            </p>
                        )}
                    </div>

                    <Button
                        onClick={() => {
                            if (flipbookRef.current?.pageFlip) {
                                screenWidth < 768 ? flipbookRef.current.pageFlip().turnToNextPage() : flipbookRef.current.pageFlip().flipNext()
                            }
                        }}
                        disabled={!canFlipNext}
                        variant='secondary'
                        size='icon'
                        className='size-8 min-w-8'
                        aria-label="Next page"
                    >
                        <ChevronRight className="size-4 min-w-4" />
                    </Button>
                </div>

                {/* Right Section: Action buttons */}
                <div className="flex items-center flex-shrink-0 justify-end gap-1 sm:gap-2 min-w-[100px]"> {/* min-width & justify-end */}
                    <Zoom zoomScale={viewerStates.zoomScale} screenWidth={screenWidth} />
                    {!disableShare && (
                        <Share shareUrl={shareUrl} />
                    )}
                    {screenfull && screenfull.isEnabled && ( // Only show button if screenfull is available
                        <Button
                            onClick={fullScreen}
                            variant='secondary'
                            size='icon'
                            className='size-8 min-w-8'
                            aria-label={screenfull.isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                            {screenfull.isFullscreen ?
                                <Minimize className="size-4 min-w-4" /> :
                                <Maximize className="size-4 min-w-4" />
                            }
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Toolbar;