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
    const containerRef = useRef<HTMLDivElement>(null)
    const flipbookRef = useRef<any>(null);
    const [pdfLoading, setPdfLoading] = useState(true);
    const [pdfDetails, setPdfDetails] = useState<PDFDetails | null>(null);
    const [viewerStates, setViewerStates] = useState({
        currentPageIndex: 0,
        zoomScale: 1,
    });

    const onDocumentLoadSuccess = useCallback(async (pdfProxy: any) => {
        try {
            const page = await pdfProxy.getPage(1);
            setPdfDetails({
                totalPages: pdfProxy.numPages,
                width: page.view[2],
                height: page.view[3],
            });
            setPdfLoading(false);
        } catch (error) {
            console.error('Error loading document page details:', error);
            setPdfLoading(false); // Ensure loading stops even on error
        }
    }, []);

    return (
        <div ref={containerRef} className={cn("relative h-[30.244rem] xs:h-[37.744rem] lg:h-[49.744rem] xl:h-[51.99rem] bg-gray-800 w-full overflow-hidden", className ?? '')}> {/* Changed bg-foreground to something like bg-gray-800 for contrast if foreground is light */}
            {pdfLoading && <PdfLoading />}
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => {
                    console.error('Failed to load PDF:', error.message);
                    setPdfLoading(false); // Stop loading on error
                }}
                loading={<></>}
            >
                {(pdfDetails && !pdfLoading) &&
                    <TransformWrapper
                        doubleClick={{ disabled: true }}
                        pinch={{ step: 2 }}
                        disablePadding={viewerStates?.zoomScale <= 1}
                        initialScale={1}
                        minScale={1}
                        maxScale={5}
                        onTransformed={({ state }) => setViewerStates(prev => ({ ...prev, zoomScale: state.scale }))}
                    >
                        <div className="w-full h-full relative bg-gray-700 flex flex-col">
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