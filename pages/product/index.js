import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "../../components/Common/Alert";
import Snackbar from "@mui/material/Snackbar";

function index({ data }) {
  const [parentClass, setParentClass] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [slug, setSlug] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [petrographic, setPetrographic] = useState("");
  const [hardness, setHardness] = useState("");
  const [waterAbsorption, setWaterAbsorption] = useState("");
  const [apparent, setApparent] = useState("");
  const [porosity, setPorosity] = useState("");
  const [flexural, setFlexural] = useState("");
  const [abrasion, setAbrasion] = useState("");
  const [compressive, setCompressive] = useState("");
  const [counterTops, setCounterTops] = useState("");
  const [floorings, setFloorings] = useState("");
  const [walls, setWalls] = useState("");
  const [shower, setShower] = useState("");
  const [firePlace, setFirePlace] = useState("");
  const [outdoor, setOutdoor] = useState("");
  const [chips, setChips] = useState("");
  const [heat, setHeat] = useState("");
  const [stain, setStain] = useState("");
  const [scratch, setScratch] = useState("");
  const [water, setWater] = useState("");
  const [frost, setFrost] = useState("");
  const [country, setCountry] = useState("");
  const [finish, setFinish] = useState("");
  const [level, setLevel] = useState("");
  const [care, setCare] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const clickHandler = (id) => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_CUSTOM}/api/product?id=${router.query.id}`
        )
        .then((res) => {
          console.log(res.data.result[0]);
          setAbrasion(res.data.result[0]?.abrasion_strength);
          setApparent(res.data.result[0]?.apparent_density);
          setCare(res.data.result[0]?.care_instruction);
          setChips(res.data.result[0]?.chip);
          setColor(res.data.result[0]?.color);
          setCompressive(res.data.result[0]?.compressive_strength);
          setCounterTops(res.data.result[0]?.countertops);
          setFinish(res.data.result[0]?.finish);
          setFirePlace(res.data.result[0]?.fireplace);
          setFloorings(res.data.result[0]?.floorings);
          setFrost(res.data.result[0]?.frost);
          setHardness(res.data.result[0]?.hardness);
          setHeat(res.data.result[0]?.heat);
          setLevel(res.data.result[0]?.level);
          setMetaDescription(res.data.result[0]?.meta_description);
          setMaterial(res.data.result[0]?.name);
          setPorosity(res.data.result[0]?.open_porosity);
          setCountry(res.data.result[0]?.origin_country);
          setOutdoor(res.data.result[0]?.outdoor);
          setPetrographic(res.data.result[0]?.petrographic_denomination);
          setScratch(res.data.result[0]?.scratch);
          setShower(res.data.result[0]?.shower);
          setSlug(res.data.result[0]?.slug);
          setStain(res.data.result[0]?.stain);
          setWalls(res.data.result[0]?.walls);
          setWater(res.data.result[0]?.water);
          setWaterAbsorption(res.data.result[0]?.water_absorption);
          setId(res.data.result[0]?.id);
          setLoading(false);
        });
    } else {
      setAbrasion("");
      setApparent("");
      setCare("");
      setChips("");
      setColor("");
      setCompressive("");
      setCounterTops("");
      setFinish("");
      setFirePlace("");
      setFloorings("");
      setFrost("");
      setHardness("");
      setHeat("");
      setLevel("");
      setMetaDescription("");
      setMaterial("");
      setPorosity("");
      setCountry("");
      setOutdoor("");
      setPetrographic("");
      setScratch("");
      setShower("");
      setSlug("");
      setStain("");
      setWalls("");
      setWater("");
      setWaterAbsorption("");
      setId("");

      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    clickHandler();
  }, [router.query]);

  const deleteHandler = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_CUSTOM}/api/product?id=${id}`)
      .then((res) => router.push("/product"));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      return reader.result;
    };
  };

  const submitHandler = () => {};

  return (
    <div className="product__layout__home__wrapper">
      <div className="product__layout__home__left__drawer">
        <div className="product__layout__home__left__drawer__content">
          <Button
            variant="contained"
            component="label"
            onClick={() => router.push("/product")}
          >
            Add New
          </Button>

          {data?.map((d) => (
            <Link href={`/product?id=${d?.id}`} key={d?.id}>
              {d?.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="product__layout__home__right__drawer">
        <div className="product__layout__home__left__drawer__content">
          <h2>Add details</h2>

          {loading ? (
            <>
              <h1>Loading</h1>
            </>
          ) : (
            <>
              <div className="details__box__wrapper">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Parent Class"
                    multiline
                    maxRows={4}
                    value={parentClass}
                    onChange={(e) => setParentClass(e.target.value)}
                  />

                  <TextField
                    id="outlined-multiline-flexible"
                    label="Category"
                    multiline
                    maxRows={4}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Material"
                    multiline
                    maxRows={4}
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Slug (url)"
                    multiline
                    maxRows={4}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <h4>Images</h4>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Button variant="contained" component="label">
                    Main Image
                    <input
                      type="file"
                      hidden
                      value={mainImage}
                      onChange={(e) => setMainImage(e.target)}
                    />
                  </Button>
                  <Button variant="contained" component="label">
                    Images
                    <input type="file" multiple hidden />
                  </Button>
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <h4>Technical Specifications</h4>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Petrographic Denomination"
                    multiline
                    maxRows={4}
                    value={petrographic}
                    onChange={(e) => setPetrographic(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Hardness"
                    multiline
                    maxRows={4}
                    value={hardness}
                    onChange={(e) => setHardness(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Water Absorption"
                    multiline
                    maxRows={4}
                    value={waterAbsorption}
                    onChange={(e) => setWaterAbsorption(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Apparent Density"
                    multiline
                    maxRows={4}
                    value={apparent}
                    onChange={(e) => setApparent(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Open Porosity"
                    multiline
                    maxRows={4}
                    value={porosity}
                    onChange={(e) => setPorosity(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Flexural Strength"
                    multiline
                    maxRows={4}
                    value={flexural}
                    onChange={(e) => setFlexural(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Abrasion Strength"
                    multiline
                    maxRows={4}
                    value={abrasion}
                    onChange={(e) => setAbrasion(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Compressive Strength"
                    multiline
                    maxRows={4}
                    value={compressive}
                    onChange={(e) => setCompressive(e.target.value)}
                  />
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <h4>Applications</h4>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="CounterTops"
                    multiline
                    maxRows={4}
                    value={counterTops}
                    onChange={(e) => setCounterTops(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Floorings"
                    multiline
                    maxRows={4}
                    value={floorings}
                    onChange={(e) => setFloorings(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Walls"
                    multiline
                    maxRows={4}
                    value={walls}
                    onChange={(e) => setWalls(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Shower"
                    multiline
                    maxRows={4}
                    value={shower}
                    onChange={(e) => setShower(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Fireplace"
                    multiline
                    maxRows={4}
                    value={firePlace}
                    onChange={(e) => setFirePlace(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Outdoor"
                    multiline
                    maxRows={4}
                    value={outdoor}
                    onChange={(e) => setOutdoor(e.target.value)}
                  />
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <h4>Features</h4>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Chips"
                    multiline
                    maxRows={4}
                    value={chips}
                    onChange={(e) => setChips(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Heat"
                    multiline
                    maxRows={4}
                    value={heat}
                    onChange={(e) => setHeat(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Stain"
                    multiline
                    maxRows={4}
                    value={stain}
                    onChange={(e) => setStain(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Scratch"
                    multiline
                    maxRows={4}
                    value={scratch}
                    onChange={(e) => setScratch(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Water"
                    multiline
                    maxRows={4}
                    value={water}
                    onChange={(e) => setWater(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Frost"
                    multiline
                    maxRows={4}
                    value={frost}
                    onChange={(e) => setFrost(e.target.value)}
                  />
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Country of Origin"
                    multiline
                    maxRows={4}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Finish"
                    multiline
                    maxRows={4}
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Level"
                    multiline
                    maxRows={4}
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Care Instructions"
                    multiline
                    maxRows={4}
                    value={care}
                    onChange={(e) => setCare(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Color"
                    multiline
                    maxRows={4}
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Meta Description"
                    multiline
                    maxRows={4}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Shop Link"
                    multiline
                    maxRows={4}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => deleteHandler()}
                  style={{
                    opacity: id ? 1 : 0,
                    pointerEvents: id ? "all" : "none",
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => submitHandler()}
                >
                  Submit
                </Button>
              </div>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={error ? "error" : "success"}
                  sx={{ width: "100%" }}
                >
                  {error ? "Please fill all fields" : "Success"}
                </Alert>
              </Snackbar>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CUSTOM}/api/product`
  );

  return {
    props: {
      data: data.result,
    },
  };
}
