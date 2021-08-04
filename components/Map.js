
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { getCenter } from 'geolib';



const MarkerClusterGroup= dynamic(
    () => import('react-leaflet-markercluster'),
    { ssr: false }
  )
const MapContainer= dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
  )
  const TileLayer= dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
  )

  const Marker= dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
  )

  const Popup= dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
  )


function Map({spaceXPads}) {

    const coordinates=spaceXPads.map(pad=>({
        latitude:pad.location.latitude,
        longitude:pad.location.longitude
    }))

  const {latitude,longitude}=  getCenter(coordinates);


    return (
        <div className="h-screen">
             <Head>
             <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossOrigin=""/>

<link
  rel="stylesheet"
  href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
/>
      </Head>
        
            <MapContainer className="h-full w-full"  
            center={[latitude, longitude]} zoom={2}
 
            scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
 
 <MarkerClusterGroup>
  {spaceXPads.map((pad)=>(
        <Marker key={pad.id} position={[pad.location.latitude, pad.location.longitude]}>
        <Popup>
         {pad.full_name}<br></br>{pad.location.region} <br /><p>status: {pad.status}</p>
        </Popup>
      </Marker>
   

  ))}
    </MarkerClusterGroup>

</MapContainer>
            
        </div>
    )
}

export default Map
