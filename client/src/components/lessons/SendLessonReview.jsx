import styled from "styled-components";
import React, { useState, useRef } from "react";
import styles from "./RecentLessonList.module.css";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


export default function SendLessonReview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState({
    lessonName: "",
    Date: "",
    Time: "",
  });

const [videoFiles, setVideoFiles] = useState([]);
const [photoFiles, setPhotoFiles] = useState([]);
const editorRef = useRef();

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Simulate searching in the dummy database
    const results = dummyDatabase.filter((item) =>
      item.name.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  const handleSelect = (customerId) => {
    const selectedResult = dummyDatabase.find(
      (item) => item.customerId === customerId
    );
    setSelectedItem(selectedResult);
    setSearchTerm(selectedResult.name);
    setSearchResults([]);
  
    // Additional logic to set the selected lesson
    const selectedLessonId = selectedResult.lessonId;
    const lessonDetails = dummyLessonDatabase.find(
      (lesson) => lesson.id === selectedLessonId
    );
  
    if (lessonDetails) {
      setSelectedLesson({
        lessonName: lessonDetails.lessonName,
        Date: lessonDetails.Date,
        Time: lessonDetails.Time,
      });
    } else {
      // Reset the lesson details if not found
      setSelectedLesson({
        lessonName: "",
        Date: "",
        Time: "",
      });
    }
  };
  const handleSelectLesson = (lesson) => {
    setSelectedLesson({
      lessonName: lesson.lessonName,
      Date: lesson.Date,
      Time: lesson.Time,
    });
  
    // Hide the search results
    setShowSearchResults(false);
  };

  const handleLessonChange = (event) => {
    setSelectedLesson((prevLesson) => ({
      ...prevLesson,
      lessonName: event.target.value,
    }));
  };
  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSelectedItem(null);
    setShowSearchResults(true);
    setSelectedLesson({
      lessonName: "",
      Date: "",
      Time: "",
    });
    setVideoFiles([]);
    setPhotoFiles([]);
  };
  // Function to handle file upload
  const handleFileUpload = (e, setFiles) => {
    const files = e.target.files;
    setFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Function to handle file deletion
  const handleDeleteFile = (index, setFiles) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <Cover>
      <Wrap>
        <Container>
        <TextWrap> Customer</TextWrap>
            <SearchBox
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
        

          <SearchResults>
            {searchResults.map((result) => (
              <SearchResultItem
                key={result.customerId}
                onClick={() => handleSelect(result.customerId)}
              >
                <img src={result.imgurl} alt={result.name} />
                {result.name}
                {result.Lesson}
                <button> Select </button>
              </SearchResultItem>
            ))}
          </SearchResults>
        </Container>

        <Container>
        <TextWrap> Select Lessons  </TextWrap>
    <SearchBox
      type="text"
      value={`${selectedLesson.lessonName}  ${selectedLesson.Date}  ${selectedLesson.Time}`}
    />


  {/* Show search results only if showSearchResults is true */}
  {showSearchResults && (
    <SearchResults>
      {selectedItem && (
        <div>
          {dummyLessonDatabase
            .filter((lesson) => lesson.customerId === selectedItem.customerId)
            .map((lesson) => (
              <SearchResultItem key={lesson.id} onClick={() => handleSelectLesson(lesson)}>
                {lesson.lessonName} - {lesson.Date}, {lesson.Time}
                <button onClick={() => handleSelectLesson(lesson)}>Select</button>
              </SearchResultItem>
            ))}
        </div>
      )}
    </SearchResults>
  )}
</Container>
<Container>
          <TextWrap> Videos</TextWrap>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, setVideoFiles)}
            multiple
          />
          {/* File preview for videos */}
          <FilePreviewContainer>
            {videoFiles.map((file, index) => (
              <FilePreviewItem key={index}>
                <video width="100" height="100" controls>
                  <source src={URL.createObjectURL(file)} type="video/mp4" />
                </video>
                <DeleteButton onClick={() => handleDeleteFile(index, setVideoFiles)}>
                  X
                </DeleteButton>
              </FilePreviewItem>
            ))}
          </FilePreviewContainer>
        </Container>

        <Container>
          <TextWrap> Photos </TextWrap>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, setPhotoFiles)}
            multiple
          />
          {/* File preview for photos */}
          <FilePreviewContainer>
            {photoFiles.map((file, index) => (
              <FilePreviewItem key={index}>
                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} width="100" height="100" />
                <DeleteButton onClick={() => handleDeleteFile(index, setPhotoFiles)}>
                  X
                </DeleteButton>
              </FilePreviewItem>
            ))}
          </FilePreviewContainer>
        </Container>
<Container>  
<TextWrap>  Comment </TextWrap>
<Editor
            height="500px"
            previewStyle="vertical"
            initialEditType="markdown"
            ref={editorRef}
          />
          </Container>     

        <BtnBox>  
        <button onClick={handleClear} className={styles.btns}> Clear </button>
        <button className={styles.btns}> Confirm </button>
        </BtnBox>   

      </Wrap>
    </Cover>
  );
}

  const Cover = styled.div`
  position: relative;
`;

const Wrap = styled.div`
margin: 2em;
`;

const dummyDatabase = [
  { customerId: 1, name: "John Doe" ,Lesson:"Reaming 10 Lessons (10/20)" , imgurl:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgYGBgYGBgYGBgYGBgYGRgZGRgZGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGDQhISM0MTQ0NDQ0MTE0NDQxNjQ0MTQ0NDQ0MTQ0NDQ0NDQ0MTQ0NDQ0MTQ0NjE0PzQ0NDE0NP/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgADBAUGBwj/xABBEAACAQIEAwUGAwYEBQUAAAABAgADEQQSITEFBkEiUWFxgRMyUpGhsQfB0RRCYnLh8COCkrIVk6LC0hYkMzRT/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAhEQEBAAICAwACAwAAAAAAAAAAAQIREiEDMUEiYRMyUf/aAAwDAQACEQMRAD8A6GC0MkqJFjRYEkkkgSSSCBJJJIEkvJJAF5LyGLAN4LwSQJeS8kWAbxSZIIEgMJgMoBimMYpgKYsYxbQNpFMYxTIBJGiwJBDJAkEkkCEySRKjhRdiAPGA0qSuhJUOpYbgMCR5iajG8x0090FtbX2F+7XW/pOUxfHD2QoVMliDl7V7gly3jY377kTPKLxr0YwThRzZWyhVCFhuWBvYnQ2vYG3naSnzbVI0ydwNtb66b26H5S7hxrupJwWH5rqgkuSdbWypk037Is3rm9J1PCuNU64FmCv8JP8AtP7wjcLjY2dpDJeAyoFoI8QwBARGMEoUxSI5iwEIgjGCBs4pjRTIAYI0kBZJJIAkkkY2gU4muqKWbYfXwE4rivGHqsUW4AJF99Jm8z8SucqnQC1wfmR/f2nOvTKL/E//AEjoPqP7E55ZfHXDDU2orvm969tQgv0F9P5jY6+cwK9yW7yVJHS17kedgZmFSxHcoP8A1dlfofvGXD3zHbUad4/XUfKYl03ZtgObDz0PiouPzi01IbLcFWGh7mGu0y2oXI8f7tK/ZG+xsCDfwImuTPFM2YjzBI69PqBr6S7DVxfski5O2hB/I93faVMnbvfezf8Al+sSrTs5OwYZv1t5H7x7X09D5e4rnXI7XdevxD9ZvZ5ZgsQVKuDvuR0NjqPO31ne8F4kKqWb313/AIh0Yf3obzWOXyueWP2NpeCSC86MCYJIIAgMMUwAYJDBA2ZkkgMgBMMkkBZI0WBJRi2VVLNsBe3S/TTvl813HWtRc+X1Ikt1NmM3ZHEYrtXZtfPqb3t9vrMcAu+vSyj5gfe8yq66a9T9dT97SYZbuo7wG+pE8++nr0i4MsGt3g+guR9ZkjA9lR1LfmB9puuE4Uaf5h8jp9/pKcQmV2X4HU+maxH3+UztrTS1sLoLDYX9dLfnGo4a9F28baDwv9rTL9i2Rid8q/UsJdw6mSjqR1zHz6/cfWN9HHtz74XXbvI+Q08pKuG2J8Rf5afPWbmnTUuw3CgEeV7HTyZflBxGjk7Nt/vp/Sa5Jxc4OyCNutvI2/T6za8v4rLUXXfT/Vt9hMeuo7XiA1t9e0D+Rkw9LKQf4QB5i81L9c7Pj0RWuLyXlVBrqD3gH5iWT0POl4JDAYEvBJAYAMEhkgbSSSAyCSSSQJFkkgQzXcephqDA9LH5GbGY/EaDPSdFtdlKi5Aux2GvU2mcvVXHfKacS63APQ3PTe5jYfCspUganUehII+olDUm9pQpHQmoAR/LoR9J6L/wxAgut7ajvv4Tz6r2SxztPhuI3VgLa2vbe97GYOOoYkMcwzZrX2NyLnceZ+czcTx+qC4SiBkBPbJBa3wgbycE4+9VhnpZAWyg+P8AKdbX0vGrra9b0z+DYbOpR10AW3l2hY/KUlVw7tmF1tYeIOoPmCDf+YTq8LhVGtraTWYvDo7nNssfCe3A1cbaq+VNHGg7u+3qbxsfji5BZMthqdZvMVxnAo4N9RsQhIN+4219I3tqOJvZgdLab/0MXr3DW/VcfUazDxAt5Le/3Hymfw2kGKA63I08NP6y3mDACmM4HZsR5AxuXKd6q9QqA+oBsfqJrHvTll1K6xEsAO4AfKEwmCel5gMEhgMAExYTBAhgkMEg2xkkMkASSSQFkkkgCZC0FZUuASHbfyWUTJwb65e8gjzH6i8xlNxvxXWUrnuP4VRj8MVtvcgbAi87OilxOf4jg/8AFSpa9nAB/m7x0/rOhwx0E4x6cppW+AU9LRaXDUTUDWbGY+JfKt5rUZ5X0rRt5qigZ3Vtm0I7wYqcYZc+bDuiqTlYlSHHxLZifnMHh/FfbMz5HTK4UF1yhr/D3iZbk9sfiHLCOwcICRbKeott4TEw/K4R85JvvO4prpKMTYCLEmX6cVzigGGceA/3ATWcqoqHtXu9lWykjYak9NpsubjmTIN2ZR9b/lMzhmHVBa3uKAL/ABGWWzWjjLu31pmmLGgM9DxlMWMYplCwGGAwFMF4TFgbiCGKZAJJDJAkkEkA3kzRSYLwMqviwVFwS2nl5zYYZ9JpbzYYKt0nLLHj3HowzuXVbRXhe1tbWlHtJpOK4Goxv7RsvVRaw+kw6Y47y1vTY1sVT2BFhv5SilSpscwAJv8A3YdJoXwBFv8AFcDyT69mY5SqrXpuSf4h+nSTv/Hpy8OMm5k7RalhNdja8pw9V8vbtfwmJi8RFrzSNdiKPtKgvqF18L3G/wApslS35+JmNh8Ns5JuRqL6eHS8yZ1ww1d1x8nk3OMSAwwGdHEpixjFlAMUwmAwFMEJiyDcRTDFgQyQSQJJJJeADAYTAZQDLKYOpXcdO8SuZODF8w8vzmM/6t+O/ky8HiQ4mWUvOexIZGzL6joZlUONJazHKe4zht6dMqtw1CbkC8xKmGCe6Ja/Fk+IfOa3HcZQfvD5yWxe0xFS3Wa5G9o+XoNW/Sa6vj3qGy6Dvm34bTyrLhN5MZ5axumZITAYJ6nlG8F4IIBvFkgMCGKYTBAUwWhMEDa3gMBMW8mg14DBeC8oa8F4t4CYDXkvEJgvAYmZeA3PpMEuNBfU7DqfKbLAIRv1mM703hPyHE0wZrsRw5XE3VVLiYjAjynDTvtyuL4RbYzXNgbGdhjHS2m80xpXaStKMFhbTaYcWEejRsIqnUiaw6u6x5O8TkwQEwXnpeYbwQXkvAhMEl4LwJJITBABiwmLA2RMF4pMBMBrwXi3gdwNSbW6naA14CZzvG+aEpL/AIdnfbrlHiSN/ITlv/UGKqXLVio7kCr8iBf6wPR6+IRBd2VR3sQPvOb4xzatNglJVfTVyTlv3ADecXVxbObliT3klifMnUyhjcWgd1yPxJKuJc1rGq69hzuAPeRO7TWw3tPRQlp8/Uq7IwZWKspBBGhBGxE9R5X54Sqq08QQlTYPsj+P8LeG32nPPH6645dadkWlL2jFwZQ5nNtj4mjMKlT7UyK/nK0EjUNUiUqessURqtZKaF3cIo3YmwEaXbB48iLh6jO7oAp7aNlcHoFPeTYes43gnNSqoStm0919WPk3U+cwebuZjiWCJcUUNwDoXb4mHQdw9fLnE752xlk7efOy3p67hsSroHQ3VhcGW3nlmC4lUpG6Oy+G4/0nQzosDzedBVS46smh/wBJ0M2w7G8F5g4LilKr7jgn4To3yMzIEvJeC8F4BMEhggZ5iVHVQSxAA3JIAHqZgca4ouHTORmYmyrtfS5J8B+YnB8T4xUrG7tp0UaKPIfnA6Ti3NqJ2aS5z8R0X0G5+k5XHcYrVj23JHwjRfkJr6r3aRjYX74C1XzHwGgk9p0ERdoqwLwYoOskQQI6ys6S1toBA2nC+ZcRh7BHJUfuP2l9O70nRUvxCze/St4q1/oR+c4YoICg7zM3GVqZWO/TnXDH3g4/yg/nGq890BolOo3icqj7mee+yHeYwp+Jk4RrnXXYvnuqwy06aJ/EzFz6CwHzvOZxvEalY3qOznpc3A8l2HpMbIIyiakk9MW2+wC98N5DJKhpA0BgvAtpuQbjQjrNvgOYK1PXMXHwuSfkb3E0d9IbwPQeH8y0alg3YY/Fqt/5v1tN0DfUTyUNadDyzxsowpu3YbQX/cJ29IHcSQXkkHFcy8R9tVNj2Euq+m59T+U0DPrLGaUVOsoUDWCq1zaMNyZWmusB1EA3hWQwHO0VYW2gWA0WPaLABEAEsSmTewJyjMbAnKo3Y22HjL8Bg3rVEpIAXd1RQTYZmNhc9IGKBJrO4H4YcQ+Cl/zR+kwOJci42g1NWRGasxSmqOrFmClyDewAspNybQOVtDM/inB8RhjavRenfYupCnyf3WPkTMK0BLSWj2kgVmSRhJADmEGI5hY6QAD9ZYptEXTWKDreB3/KnEGqUyjtdkItffJaw87EH5ib2eccKxxour9AbMO9SbN97+k73/iNH/8ARfmIHm+bp3StzC51v84jnSBHbs/SLT7oL3HrIh1gWJGiiMBAjyKIHOsz+Dex9tT/AGkMaOce0CGzZOpB3sNzbW17EG0DJ4Jy7icZm/Z6RfIO0bqqg9FzsQuY915i8R4bVw7mlXRqbgAlWtex2IIJBG+oPQz6DohamFQcMq0KaBwFcU86BEazqEBXtabn6XDDVc78u0+I0z7Kohr4csFylG7RUMaVQjVbixGuhIOsisL8NaiJwsM63U1XpvZM5YPUCDMALsvbF+4XnFc18CbheLSvRUGkagejmuyqyWY031ubbjW5HiDO8/D/AAlZOFgI6I7NUdHYZ1Q5spDrcdoFWBF9D3zXYLnLBtgUXiLitWzPnpFEd86O1iFRQiC1srG2nWUbXkHmCtjKOIrVsoKvlVUBCqFpKeyCSdSb79ZyXKHMuL4hi8HTqZLYcPVZ1Uh2ApFGLliQSxcA2A94y7knnLAYTCijU9pnL1C5yZi6ljkzkGxOTKPSNyBzFw3DmtnPsnqVqpSo1OyrQZgadMOt8igKDY2AMDuOJcPq1cZQZlpthaVOo1mN3NZ1KAlCLFQpIH8zeE8n/EajhRi1o4OiqOl0qKilVaqxXKqJtcD4QNWt0np3JFQ1VxGI9u9Ra2IqtTRnzCnTSo6JYfuhgL6AaZd9z55ydy1Ux2MbEVlJoio9ZnsSlZ/aGy02IGZcwJPcq2IGYSDRcwcm4zBoHqoChAu6HOqEgdl9AVPS+19jOdJnqv4mc7MGq4Ghly5claprmzEguidLZeyx/iI0tOZ4nyHiKWCTFhg91DvTVTemjC6tm/etpm0Fr9QCZUca0EYiKTArc6xjK+sNQ6gQok6yAwQ2gX0tRbwiZo1JtomSEWtKibS4yloCL1EinWK+hB6QtAuzSy9pj0zHdtRAYjWWrPUfwnpYKtRq4epTR6xc1HSqiOGQAKpp5r3A69QW7iJ0OJ5Z4UaZevhDhwKgpal0JZmCpl9kxDKxYWO3laQcD+GPMDYfFLRZ1WjXbK+YkAPlIRlIGjE5V10Nxc6CdxzLzbg+HtVGHRHxVRg1QKLAOBo1Zx1Fycg1uTe1yZzH4kcE4fhGw1NFamzX9oyMWPslGUMyMdXLfvdcrX6TzhmFzr1O+/mfGVWRUxlRk9mzuUuWyF2KZiblsl8tyTe9ptuVuV6+PcrTsqJbPVb3EvsAN2b+EepE1nC8A+IqpRp2zubAsbKoALMzHoAoJPlPecNVwfCsMiOwpoDubszubZiBqzHrYXsB3CEc1h/wpw4tnxFZrbhAiA/NWIHrMDj/AOF5VS+DqM5Av7KplzHwRxYX8GHrOnr/AIjcPDAe1dh1ZaT2HncAn0BnVYOslRFem4dHAZXU3DA9QZFfMyu9NiVLo63UlSyODsykixG1iJ6Dyn+JP7PRFCvRBWmmWk1IBfdXso4JtqR7479R1lf4t8vilVXFILJWOVwOlUAnN/mUfND3zzpn8ZR63wvk3DYJf2/HVVqBVWplUFqSuzEgqSS1X3kC33OutxbqOaXqVsKlFFdXxZSmwADNSpsA1Zn1A7KZgTfcgC9xPJOW+OVXbD4GriMuFNdC4a1sgYN7Nm3CFgBbYZu6excw8XrLejhKLVsQw8BSo3tZ6zkgA2Nwl7nykHk/4g8mDAlKlJi1F7J22XOtQC5HTMCBe4GmoPScPVM9Zxn4c4/ErnxOOR6gByq2d1XMSzDP2QuvwqdgNgLeVcUwj0alSi4s9N2RgNRdTY2Pd1HhKjGQQN73pGSVsbmFOmsaQDSSBZTOsOaKpi3hFzCVmOIjwFOotKvCXNKHbWFMh1lp3EoBlp3EDNw+IamyujFWVsyspsysNiDPauWuJYfjWGKYukC9BgzgMyoxZHQVFykEaF9D7ptrtPDzLKNVkOZGZWsRdWKmxFiLjWxHTrCOjqcQpg2p1TkXFdjO5dxhV0C5iPdNr5R3ylccilGLqcmKLKFBuMOQBlUW93+GaQMlgCGuAbkEam+gselovY/i693wi3l2r+kxZHaeSySPQOSsClZiFfO9EVnAQdkh2RVBZgNLFiB3jwnY8b4PRxFSp7d2REpglQ9MLTpMvvOrGyEFGIYg7adZx34R0r4mq6FrJSswawBzslrgHcFHt5zuecuE1KtF2oIDXYUlzKVDNTSqlQp2uy2qkgNpqR1N2i+S+unLcC5a4ViGKUK1Z2p5nBJRHcAgEgFAWVSBra3anaYHhhp06QWnYZi1ZBbtEhrHLfKQGa9hv6TluT+BVnY13VcO1Nyafs1ojMzMPalxTJzdgFcrGwzmwFhO/DPYbXvra9reH0izaTKyajm+N8Nqvh3ViwASoyDNcoyvnp5wD2hlXKd9CR1nlC4+mCCjIiftOfKRqKBAzAi3ukgnL4iexc5BhgMUSB/8FT5FSB67TwBsl/39x8O3X13jjF/kv6bHiFZXp2zozCs+QDcUiAFUaaLcbdJ6vyLi3fhVsJk/aELqRUJZTVLZrubg9pWFtdNBraeLPk1y5t9M1tra3t1vN1yzzViMCKgo5D7UKDnBYKVJsygEa2LD5d01JpjLLd29MxvDsTh8ThMTiMdUqKajJUXs06NNqlNggCDs5S3YuddV1nlPPeNStj8Q9MgoWUZgbhiiKjMCOhKmV8d5ixOJ/wDsVncbhCQqDyRQF9bXmiEMrBEQde+NfSLSWUWNIsW8YQHgvIIbQh2EDSxpXArMpxA2MuaVVtpAgMvTpMdZfT6SquvJmiyGENeERI4gejfg4w/aK6nrSU/6XA/7p7AoUi08Q/Cg/wDvz40Kn+6nPbZBMNSRBlRFUXvZQFHnYCWkgf0lTRDA0/OqO+AxKUwC5ptpa900LhR8RTMB42nzwTPp/r6GfLtP3R5D7QGkhWK0ox6zdIgMje8YYUH2lg2iPHaBFjSLIYQbw3gkkH//2Q==" },
  { customerId: 2, name: "Jane Smith",Lesson:"Reaming 10 Lessons (10/20)" ,imgurl:"data:image/jpeg;base64,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"},
  { customerId: 3, name: "Bob Johnson" ,Lesson:"Reaming 10 Lessons (10/20)",imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVPc9VmYsN0CKp9AcMik5PI58aiIETafgGA&usqp=CAU"},
  { customerId: 4, name: "Sam",Lesson:"Reaming 10 Lessons (10/20)", imgurl:"data:image/jpeg;base64,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"},
  { customerId: 5, name: "Holy",Lesson:"Reaming 10 Lessons (10/20)",imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0z0MvO7lhnjUdQ3kxxw4bV8n0bew1MTS9A&usqp=CAU" },
  { customerId: 6, name: "Yang",Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxAidy3-NiMvCRMUKo8NXgjdXDGDH4eX4eA&usqp=CAU"},
  { customerId: 7, name: "Kim" ,Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08UVDSPXbleYiE3ow2kthSyWnXXP27YJnfw&usqp=CAU"},
  { customerId: 8, name: "Lee" ,Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoxXSiQ6wF4S9nh4_sY2F9QbV77pSY8aFoQw&usqp=CAU"},
  { customerId: 9, name: "윤철" ,Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4hARPoTiWkTqMZ8m36Rv7umwUaQhZIoryw&usqp=CAU"},
  { customerId: 10, name: "승우",Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ81pDxzBw-24oVe04bME8M4SXVVb8vWjruyw&usqp=CAU" },
  { customerId: 11, name: "현경" ,Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwi-trQA8apTUNlnU0lYUpaYN0rI6ZxuBJHp-8bhcv8vDCrhylzqSOr4IMpGW8SGx6b9M&usqp=CAU"},
  { customerId: 12, name: "민지",Lesson:"Reaming 10 Lessons (10/20)", imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWMNjn0h2NR3RzZZRRfndkIkEFkkiouwhCng&usqp=CAU" }
];

const dummyLessonDatabase = [
  { id: 1, customerId: 1, lessonName: "Lesson 1" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 2, customerId: 1, lessonName: "Lesson 2" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 3, customerId: 1, lessonName: "Lesson 3" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 4, customerId: 2, lessonName: "Lesson A" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 5, customerId: 2, lessonName: "Lesson B" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 7, customerId: 3, lessonName: "Lesson 1" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 8, customerId: 4, lessonName: "Lesson 2" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 9, customerId: 4, lessonName: "Lesson 3" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 10, customerId: 4, lessonName: "Lesson A" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 11, customerId: 5, lessonName: "Lesson B" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 12, customerId: 5, lessonName: "Lesson 1" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 13, customerId: 6, lessonName: "Lesson 2", Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 14, customerId: 7, lessonName: "Lesson 3" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 15, customerId: 8, lessonName: "Lesson A", Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 16, customerId: 8, lessonName: "Lesson 2" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 17, customerId: 8, lessonName: "Lesson 3" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 18, customerId: 9, lessonName: "Lesson A" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 19, customerId: 9, lessonName: "Lesson B" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 20, customerId: 10, lessonName: "Lesson 1" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 21, customerId: 11, lessonName: "Lesson 2" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 22, customerId: 10, lessonName: "Lesson 3" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 23, customerId: 11, lessonName: "Lesson A" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 24, customerId: 12, lessonName: "Lesson B" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 25, customerId: 12, lessonName: "Lesson 1" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 26, customerId: 11, lessonName: "Lesson 2" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" },
  { id: 27, customerId: 12, lessonName: "Lesson 3", Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00"  },
  { id: 28, customerId: 10, lessonName: "Lesson A" , Date : "Nov. 4 2023   Thu" , Time : "PM 2:00 - PM 3:00" }
];

const Container = styled.div`
  text-align: left;
  margin-top: 10px;
`;

const SearchBox = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
`;


const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;
const TextWrap = styled.div`
color: black;
`;

const BtnBox = styled.div`
text-align: center;
margin-top: 20px;
`;



const SearchResultItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
  img {
    width: 30px; /* Set the desired width for the circular image */
    height: 30px; /* Set the desired height for the circular image */
    border-radius: 50%; /* Create a circular shape */
    margin-right: 10px; /* Add margin to the right of the image */
  }
`;
const FilePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// Styled component for each file preview item
const FilePreviewItem = styled.div`
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
`;

// Styled component for the delete button (X)
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;
