if (window.location.protocol == 'file:') {
    alert('please use a local server');
}

(function() {
    var debug = false,
		root  = this,
		EXIF  = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }
    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0  : "Unknown",
            1  : "Daylight",
            2  : "Fluorescent",
            3  : "Tungsten (incandescent light)",
            4  : "Flash",
            9  : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            var iptcdata = findIPTCinJPEG(binFile);
            img.exifdata = data || {};
            img.iptcdata = iptcdata || {};
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        return tags;
    }

    EXIF.getData = function(img, callback) {
        if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function() {
            return EXIF;
        });
    }
}.call(this));

(function(W,D) {
		
	if (!W.HQCUTIMAGE) W.HQCUTIMAGE = (function() {
		var a = {
			version  : '1.0.0',
			basePath : (function() {
				var d = W.HQCUTIMAGE_CSSPATH || '';
				if(!d) {
					var e        = D.getElementsByTagName('script');
					for (var f = 0; f < e.length; f++) {
						var g = e[f].src.match(/(^|.*[\\\/])hqcutimage(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
						if (g) {
							d = g[1];
							break;
						}
					}
				}
				if (d.indexOf('://') == -1) if (d.indexOf('/') === 0) d = location.href.match(/^.*?:\/\/[^\/]*/)[0] + d;
				else d = location.href.match(/^[^\?]*\/(?:)/)[0] + d;
				if (!d) throw 'The HQCUTIMAGE installation path could not be automatically detected. ';
				return d;
			})(),
			ort     : (function() {
				return !window.orientation?true:false;
			})(),
			runAlert: "请在竖屏状态下完成此操作！"
		};
		return a;
	})();

	var a           = HQCUTIMAGE;
	a.W = document.body.clientWidth;
	a.H = document.body.clientHeight;
	
	a.init = function(obj,opt) {
		a.opt = {
			debug    : false,
			size     : 1500,       //初始图片大小
			w        : null, 		
			h        : null,
			times    : 2,		  //缩放倍数
			callback : function() {}
		};
		for(var i in opt) a.opt[i] = opt[i];
		if(a.opt.size<a.W) a.opt.size = a.W;
		if(a.opt.w>a.W-2||a.opt.w<200) {
			a.opt.w = null;
			a.opt.h = null;
		}
		if(a.opt.h>a.H-92||a.opt.w<200) {
			a.opt.w = null;
			a.opt.h = null;
		}
		window.addEventListener("orientationchange",function() {
			a.ort = !window.orientation?true:false;
			a.show();
		},false);
		var obj = typeof obj=="string"?a.tools.$(obj):a.opt.obj;
		obj.addEventListener("change",a.saveImage,false);
		a.c = document.createElement("canvas");
	};
	a.show = function() {
		var view = a.tools.$(".HQ_cut_view");
		if(view) !a.ort?(view.style.visibility="hidden",alert(a.runAlert)):(view.style.visibility="visible");
	};
	if(!a.css) {
		a.css = function() {
			$style  = D.createElement("style");
			$style.setAttribute("type","text/css"); 
			D.getElementsByTagName("head")[0].appendChild($style);
			if($style.styleSheet) $style.styleSheet.cssText += this.css.cssCode; 
			else if(D.getBoxObjectFor) $style.innerHTML += this.css.cssCode;
			else $style.appendChild(D.createTextNode(this.css.cssCode));
		};
		a.css.cssCode = '.HQ_cut_view {position:absolute;z-index:1000;width:100%;height:100%;top:0;left:0;overflow:hidden;background:#000;}' +
		'.HQ_cut_box {position: absolute;z-index: 2000;box-sizing: content-box;pointer-events: none;}' +'.HQ_cut_console {width:100%;position:absolute;bottom:0;left:0;z-index: 3000;height:80px;background:rgba(51,51,51,0.8);font-size:30px;line-height:80px;color:#fff;}' +'.HQ_cut_console div {width:40%;text-align:center;}' +
		'.HQ_cut_console .HQ_cancel_button {float:left;}' +
		'.HQ_cut_console .HQ_send_button {float:right;}' +
		'.HQ_resize_image {position:absolute;z-index:1000;}' +
		'.HQ_select_area{border:1px solid #fff;background:none;z-index:4000;left:5px;position:absolute;box-sizing: content-box;pointer-events: none;}';
		a.css();
	}
	a.ua = (function() {
		var ua = navigator.userAgent;
		if(!/Android (\d+\.\d+)/.test(ua)) return "ios";
		else return "android";
	})();
	a.dom = '<div class="HQ_select_area"></div>'+
			'<div class="HQ_cut_box"></div>' +
			'<img class="HQ_resize_image" src="" />' +
			'<div class="HQ_cut_console">' +
				'<div class="HQ_cancel_button">取消</div>' +
				'<div class="HQ_send_button">选取</div>' +
			'</div>';
	
	

	a.tools = {
		$      : function() {
			return D.querySelector(arguments[0]);
		},
		setCss : function(o,k,v) {
			if(!o||!k) return;
			var val = {},cssCode = "";
			typeof k=="string"?(val[k]=v):(val=k);
			for(var i in val) cssCode += i+":"+val[i]+";";
			o.style.cssText = cssCode;
		}
	};
	
	a.saveImage = function(e) {
		if(!a.ort) {
			alert(a.runAlert);
			return;
		}
		a.event_state = {};
		EXIF.getData(e.target.files[0], function() {
			exif = EXIF.getTag(this, "Orientation");
		});
		var files = e.target.files;
		for (var i = 0, f; f = files[i]; i++) {
			if (!f.type.match('image.*')) {
				alert("请选择图片文件，完成操作！");
				continue;
			}
			var reader = new FileReader();
			reader.onload = function(e) {
				a.image = e.target.result;
				a.loadImg();
			};
			reader.readAsDataURL(f);
		}
	};
	
	a.loadImg = function() {
		var pic = new Image();
		pic.src = a.image;
		if (pic.complete) a.rootImg(pic);
		else pic.onload = function() { a.rootImg(pic); };
	};
	
	a.rootImg = function(pic) {
		a.HQ_cut_view = document.createElement('div');
		a.HQ_cut_view.className = "HQ_cut_view";
		a.HQ_cut_view.innerHTML = a.dom;
		//document.body.appendChild(HQ_cut_view);
		document.body.insertBefore(a.HQ_cut_view,document.body.childNodes[0]);
		
		a.tools.$(".HQ_resize_image").src = a.image;

		a.tools.$(".HQ_cancel_button").addEventListener("click",function() {
			document.body.removeChild(a.HQ_cut_view);
		},false);
		
		
		a.tools.$(".HQ_send_button").addEventListener("click",a.cutRun,false);
		
		a.p = pic.width/pic.height;
		a.s = a.opt.size * a.p;
		
		if(exif==6||exif==8) {
			a.picW = pic.height;
			a.picH = pic.width;
			if(a.picW > a.opt.size && a.picH > a.opt.size&&a.picW <= a.picH&&a.picH > a.s) {
				a.picW = a.opt.size;
				a.picH = a.s;
			}
		}else {
			a.picW = pic.width;
			a.picH = pic.height;
			if(a.picH > a.opt.size && a.picW > a.opt.size) {
				a.picH = a.opt.size;
				a.picW = a.s;
			}else if(a.picH<a.opt.h&&a.picH>a.picW){
				a.picH = a.opt.h;
				a.picW = a.opt.h * a.p;
			}else if(a.picW < a.opt.w) {
				a.picW = a.opt.w;
				a.picH = a.opt.w/a.p;
			}
		}
		
		
		if(a.ua=="ios") _r();
		else setTimeout(_r,10)
		
		function _r() {
			a.resize(a.picW,a.picH,function() {
				a.oW = a.picW;
				a.oH = a.picH;
				if(a.opt.size <= a.oW) a.opt.times = 1.5;
				var b = new a.event();
			},true);
		}
	};
	
	a.resize = function(width,height,callback,t) {
		var o = a.tools.$('.HQ_resize_image');
		a.c.width  = a.picW = width;
		a.c.height = a.picH = height;
		var ext = a.c.getContext('2d');
		exif&&a.opt.debug&&console.log("orientation:"+exif);
		a.opt.debug&&console.log("images: width="+width+";height="+height+'.');
		
		if(t) {
			switch (exif) {
				case 3:
					// 180° rotate left
					ext.translate(width, height);
					ext.rotate(Math.PI);
					break;
				case 6:
					// 90° rotate right
					ext.scale(width/height, height/width);
					ext.rotate(0.5 * Math.PI);
					ext.translate(0, -height);
					break;
				case 8:
					// 90° rotate left
					ext.scale(width/height, height/width);
					ext.rotate(-0.5 * Math.PI);
					ext.translate(-width, 0);
					break;
				default:
					ext.translate(0, 0);
					break;
			}
			var encoderOptions = 0.4;
		}else {
			var encoderOptions = 1;
		}
		ext.drawImage(o, 0, 0, width, height);
		
        o.src = a.c.toDataURL("image/jpeg",encoderOptions);
		
		
		
		if (o.complete) callback();
		else o.onload = callback;
		

	};
	
	a.event = function() {
		a.box  = a.tools.$(".HQ_cut_box");
		a.area = a.tools.$(".HQ_select_area");
		a.pic  = a.tools.$(".HQ_resize_image");
		this.output();
	};
	a.event.prototype = {
		output   : function() {
			var val  = a.opt.h || a.W - 14,
				top  = a.H/2 - val/2,
				lv   = a.opt.w?a.W/2-a.opt.w/2:5;
			a.cW = a.opt.w || a.W-10;
			a.cH = a.opt.h || a.W-10;
			var css  = {
				width        : a.cW,
				height       : a.cH,
				"border-top" : "solid "+(top-40)+"px rgba(0, 0, 0, .8)",
				"border-bottom" : "solid "+(top+40)+"px rgba(0, 0, 0, .8)",
				"border-left" : "solid "+ lv +"px rgba(0, 0, 0, .8)",
				"border-right" : "solid "+ lv +"px rgba(0, 0, 0, .8)"
			};
			var picCss = {};
			
			if(a.picW<=a.picH) {
				if(a.picW>=a.W) a.sW = a.W; 
				else if(a.picW<a.cW) {
					a.sW = a.oW = a.cW;
					a.oH = a.picH*(a.sW/a.picW);
				}else a.sW = a.picW;
				picCss.width  = a.sW;
				picCss.height = a.picH*(a.sW/a.picW);
			}else {
				if(a.picH>=a.W) a.sH = a.W;
				else if(a.picH<a.cH) {
					a.sH = a.oH = a.cH;
					a.oW = a.picW*(a.sH/a.picH);
				}else a.sH = a.picH;
				picCss.height = a.sH;
				picCss.width  = a.picW*(a.sH/a.picH);
			}
			picCss.top    = a.H/2 - picCss.height/2 - 40;
			picCss.left   = a.W/2 - picCss.width/2;
	
			
			a.tools.setCss(a.area,{
				width  : a.cW-1,
				height : a.cH-1,
				top    : top-40,
				left   : lv
			});
			a.origin = {
				x:[lv,a.cW-1+lv],
				y:[top-40,a.cH-1+(top-40)]
			};
			a.position = {
				x:[],
				y:[]
			};
			a.tools.setCss(a.box,css);
			a.tools.setCss(a.pic,picCss);
			document.documentElement.addEventListener('touchmove',function(e) {
				e.preventDefault();
				e.stopPropagation();
			},false);
			a.pic.addEventListener('touchstart',a.movStart,false);
		}
	};
	a.saveEventState = function(e,obj) {
		a.event_state.container_width  = obj.width;
        a.event_state.container_height = obj.height;
        a.event_state.container_left   = obj.offsetLeft;
        a.event_state.container_top    = obj.offsetTop;
		
        a.event_state.mouse_x = (e.clientX || e.pageX || e.touches[0].clientX) + document.body.scrollLeft;
        a.event_state.mouse_y = (e.clientY || e.pageY || e.touches[0].clientY) + document.body.scrollTop;

        if (typeof e.touches !== 'undefined') {
            a.event_state.touches = [];
			for(var i=0,l=e.touches.length;i<l;i++) {
				a.event_state.touches[i] = {};
                a.event_state.touches[i].clientX = 0 + e.touches[i].clientX;
                a.event_state.touches[i].clientY = 0 + e.touches[i].clientY;
			}
        }
	};
	
	a.movStart = function(e) {
		e.preventDefault();
		e.stopPropagation();
		a.saveEventState(e,this);
		this.addEventListener('touchmove',a.movFn,false);
		this.addEventListener('touchend',a.endMoving,false);
	};

	
	a.moving = function(e,a) {
		var mouse = {},
            touches;
        e.preventDefault();
        e.stopPropagation();
        touches = e.touches;
        mouse.x = (e.clientX || e.pageX || touches[0].clientX) + document.body.scrollLeft;
        mouse.y = (e.clientY || e.pageY || touches[0].clientY) + document.body.scrollTop;
		var left = mouse.x - (a.event_state.mouse_x - a.event_state.container_left),
			top  = mouse.y - (a.event_state.mouse_y - a.event_state.container_top);
			
		a.position.x[0] = left;
		a.position.y[0] = top;
		
	    a.pic.style.left = left;
		a.pic.style.top  = top;
		a.opt.debug&&console.log("mouse left:"+left+";mouse top:"+top+'.');
        if (a.event_state.touches && a.event_state.touches.length > 1 && touches.length > 1) {
		
            var width  = a.event_state.container_width,
				height = a.event_state.container_height;
			
            var ab = a.event_state.touches[0].clientX - a.event_state.touches[1].clientX;
            ab = ab * ab;
            var ba = a.event_state.touches[0].clientY - a.event_state.touches[1].clientY;
            ba = ba * ba;

            var dist1 = Math.sqrt(ab + ba);



            ab = e.touches[0].clientX - touches[1].clientX;
            ab = ab * ab;
            ba = e.touches[0].clientY - touches[1].clientY;
            ba = ba * ba;
            var dist2 = Math.sqrt(ab + ba);
            var ratio = dist2 / dist1;

			if(width * ratio>=a.oW*a.opt.times || height * ratio <= a.cH || width * ratio <= a.cW)  return;
			
			width = width * ratio;
			a.pic.style.width = width;
			a.pic.style.height = "auto";
			a.opt.debug&&console.log("images zoom:"+width);
        }
		
	};
	a.movFn = function(e) {a.moving(e,a);};
	a.endMoving = function(e) {
		e.preventDefault();
		a.postFn();
        this.removeEventListener('touchmove',a.movFn,false);
        this.removeEventListener('touchend',a.endMoving,false);
	};
	
	a.postFn = function() {
		var w = a.pic.width;
		var h = a.pic.height;
		a.position.x[1] = a.position.x[0]+w;
		a.position.y[1] = a.position.y[0]+h;
		
		if(a.position.x[0]>a.origin.x[0]) a.position.x[0] = a.origin.x[0];
		else if(a.position.x[1]<a.origin.x[1]) {
			var ab = w-(a.cW+a.origin.x[0]);
			a.position.x[0] = -ab;
		}
		
		if(a.position.y[0]>a.origin.y[0]) a.position.y[0] = a.origin.y[0];
		else if(a.position.y[1]<a.origin.y[1]) {
			var ab = h-(a.cH+a.origin.y[0]);
			a.position.y[0] = -ab;
		}
		
		a.opt.debug&&console.log("image position: x="+a.position.x[0]+";y="+a.position.y[0]+".");
		
		a.pic.style.left = a.position.x[0];
		a.pic.style.top  = a.position.y[0];
	}; 
	
	a.cutRun = function() {
		a.tools.$(".HQ_send_button").removeEventListener("click",a.cutRun,false);
		a.resize(a.pic.width,a.pic.height,function() {
			var crop_canvas = document.createElement('canvas');
			crop_canvas.width  = a.cW;
			crop_canvas.height = a.cH;
			var left = a.area.offsetLeft - a.pic.offsetLeft;
            var top  = a.area.offsetTop - a.pic.offsetTop;
			crop_canvas.getContext('2d').drawImage(a.pic, left, top, a.cW, a.cH, 0, 0, a.cW, a.cH);
			var newPic = crop_canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
			a.opt.callback(newPic);
			document.body.removeChild(a.HQ_cut_view);
			if(a.opt.debug) {
				console.log("image origin: L="+left+";T="+top+'. image size: W='+a.cW+';H='+a.cH+'.');
				console.log(newPic);
			}
		},false);
	};
})(window,document);