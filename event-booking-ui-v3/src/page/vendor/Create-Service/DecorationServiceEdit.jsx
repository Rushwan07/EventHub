import { ImageIcon, Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import useFirebaseUpload from "@/hooks/use-firebaseUpload";

const DecorationServiceEdit = ({ images, setImages, setIsLoading }) => {
    // Initialize local states for image previews and upload states
    const [img1, setImg1] = useState(images[0] || null);
    const [img2, setImg2] = useState(images[1] || null);
    const [img3, setImg3] = useState(images[2] || null);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);

    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const {
        progress: progress1,
        error: error1,
        downloadURL: downloadURL1,
    } = useFirebaseUpload(file1);
    const {
        progress: progress2,
        error: error2,
        downloadURL: downloadURL2,
    } = useFirebaseUpload(file2);
    const {
        progress: progress3,
        error: error3,
        downloadURL: downloadURL3,
    } = useFirebaseUpload(file3);

    useEffect(() => {
        if (error1) {
            console.log(error1);
            setLoading1(false);
            setIsLoading(false);
            return;
        } else if (downloadURL1) {
            setImages((prev) => {
                const updatedImages = [...prev];
                updatedImages[0] = downloadURL1;
                return updatedImages;
            });
            setImg1(downloadURL1);
            setLoading1(false);
            setIsLoading(false);
        }
    }, [error1, downloadURL1]);

    useEffect(() => {
        if (error2) {
            console.log(error2);
            setLoading2(false);
            setIsLoading(false);
            return;
        } else if (downloadURL2) {
            setImages((prev) => {
                const updatedImages = [...prev];
                updatedImages[1] = downloadURL2;
                return updatedImages;
            });
            setImg2(downloadURL2);
            setLoading2(false);
            setIsLoading(false);
        }
    }, [error2, downloadURL2]);

    useEffect(() => {
        if (error3) {
            console.log(error3);
            setLoading3(false);
            setIsLoading(false);
            return;
        } else if (downloadURL3) {
            setImages((prev) => {
                const updatedImages = [...prev];
                updatedImages[2] = downloadURL3;
                return updatedImages;
            });
            setImg3(downloadURL3);
            setLoading3(false);
            setIsLoading(false);
        }
    }, [error3, downloadURL3]);

    const handleFileChange = async (index, e, setImg, setFile, setLoading) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            setIsLoading(true);
            setFile(file);
        }
    };

    return (
        <div className="mt-5 h-full">
            <label>Decoration images:</label>
            <br />
            <br />
            {[img1, img2, img3].map((img, index) => (
                <div
                    key={index}
                    className="bg-input rounded-[25px] h-[300px] overflow-hidden border-[2px] border-primary group mt-5 relative"
                >
                    <label className="h-full cursor-pointer flex items-center justify-center">
                        {(index === 0 && loading1) ||
                        (index === 1 && loading2) ||
                        (index === 2 && loading3) ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                                <Loader className="text-white" />
                            </div>
                        ) : null}
                        {img ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={img}
                                    alt={`image-${index}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300"></div>
                            </div>
                        ) : (
                            <ImageIcon className="size-20 text-gray-400" />
                        )}
                        <input
                            type="file"
                            className="hidden w-full"
                            onChange={(e) =>
                                handleFileChange(
                                    index,
                                    e,
                                    [setImg1, setImg2, setImg3][index],
                                    [setFile1, setFile2, setFile3][index],
                                    [setLoading1, setLoading2, setLoading3][
                                        index
                                    ]
                                )
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default DecorationServiceEdit;
