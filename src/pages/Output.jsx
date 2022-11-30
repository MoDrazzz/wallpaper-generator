import OutputCallendar from "@/components/organisms/OutputCallendar.jsx";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import useRender from "@/hooks/useRender";
import { useDataContext } from "@/components/DataProvider";

const Output = () => {
	const [canvas, setCanvas] = useState();
	const { photo } = useDataContext();

	const outputRef = useRef();
	const { renderWallpapers } = useRender(outputRef);

	if (!photo) {
		return <Navigate to="/" />;
	}

	useEffect(() => {
		document.querySelector("#outputPhoto").style.backgroundImage = `url(${photo && URL.createObjectURL(photo)
			})`;
		renderWallpapers(outputRef).then((res) => {
			// console.log(res);
			setCanvas(res);
		});
		// console.log(renderWallpapers(outputRef));
	}, []);

	return (
		<>
			<img src={canvas} alt="" />
			<div ref={outputRef} id="exportContainer" className="hidden">
				<div
					className={`flex h-[100vh] flex-col justify-end bg-cover bg-center`}
					id="outputPhoto"
				>
					<OutputCallendar />
				</div>
			</div>
		</>
	);
};

export default Output;
