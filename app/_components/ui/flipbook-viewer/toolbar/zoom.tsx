import { useControls } from 'react-zoom-pan-pinch';
import { Button } from '../../button';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

const Zoom = ({ zoomScale, screenWidth }: { zoomScale: number, screenWidth: number }) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
        <>
            {screenWidth > 768 &&
                <>
                    <Button onClick={() => zoomOut(0.25)} disabled={zoomScale == 1} variant='secondary' size='icon' className='size-8 min-w-8'><ZoomOut className="size-4 min-w-4" /></Button>
                    <Button onClick={() => zoomIn(0.25)} disabled={zoomScale >= 5} variant='secondary' size='icon' className='size-8 min-w-8'><ZoomIn className="size-4 min-w-4" /></Button>
                    <Button onClick={() => resetTransform()} variant='secondary' size='icon' className='size-8 min-w-8'><RotateCcw className="size-4 min-w-4" /></Button>
                </>
            }
        </>
    )
}

export default Zoom