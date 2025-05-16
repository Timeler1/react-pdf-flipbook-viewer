import { useCallback, useRef, useState } from "react";
import Toolbar from "./toolbar/toolbar";
import { cn } from "./../../lib/utils";
import Flipbook from "./flipbook/flipbook";
import screenfull from 'screenfull';
import { TransformWrapper } from "react-zoom-pan-pinch";
import { Document } from "react-pdf";
import PdfLoading from "./pdf-loading/pdf-loading";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import React from "react";
import { PDFDetails } from "../../lib/definitions";

const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare = false }: { pdfUrl: string, shareUrl?: string, className?: string, disableShare?: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null); // For full screen container
    const flipbookRef = useRef<HTMLDivElement>(null);
    const [pdfLoading, setPdfLoading] = useState(true);
    const [pdfDetails, setPdfDetails] = useState<PDFDetails | null>(null);;
    const [viewerStates, setViewerStates] = useState({
        currentPageIndex: 0,
        zoomScale: 1,
    });

    // Setting pdf details on document load >>>>>>>>>
    const onDocumentLoadSuccess = useCallback(async (document: { getPage: (arg0: number) => any; numPages: number; }) => {
        try {
            const pageDetails = await document.getPage(1);
            setPdfDetails({
                totalPages: document.numPages,
                width: pageDetails.view[2],
                height: pageDetails.view[3],
            });
            setPdfLoading(false);
        } catch (error) {
            console.error('Error loading document:', error);
        }
    }, []);

    return (
        <div ref={containerRef} className={cn("relative h-[20.163rem] xs:h-[25.163rem] lg:h-[33.163rem] xl:h-[34.66rem] bg-foreground w-full overflow-hidden", className ?? '')}>
            {pdfLoading && <PdfLoading />}
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<></>} >
                {(pdfDetails && !pdfLoading) &&
                    <TransformWrapper
                        doubleClick={{ disabled: true }}
                        pinch={{ step: 2 }}
                        disablePadding={viewerStates?.zoomScale <= 1}
                        initialScale={1}
                        minScale={1}
                        maxScale={5}
                        onTransformed={({ state }) => setViewerStates({ ...viewerStates, zoomScale: state.scale })}
                    >
                        <div className="w-full relative bg-foreground flex flex-col justify-between">
                            <Flipbook
                                viewerStates={viewerStates}
                                setViewerStates={setViewerStates}
                                ref={flipbookRef}
                                screenfull={screenfull}
                                pdfDetails={pdfDetails}
                            />
                            <Toolbar
                                viewerStates={viewerStates}
                                setViewerStates={setViewerStates}
                                containerRef={containerRef}
                                flipbookRef={flipbookRef}
                                screenfull={screenfull}
                                pdfDetails={pdfDetails}
                                shareUrl={shareUrl}
                                disableShare={disableShare}
                            />
                        </div>
                    </TransformWrapper >
                }
            </Document>
        </div>
    );
}

export default FlipbookViewer;
