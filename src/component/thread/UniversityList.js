import React, { useState, useRef } from "react"
import { IonPopover, IonItem, IonInput, IonIcon } from "@ionic/react"
import { universityServer } from "servers/endpoints"
import { arrowBackOutline } from "ionicons/icons"
import { authInstance } from "api/axiosInstance"
import { useDebouncedEffect } from "hooks/useDebouncedEffect"
import SearchLoadingSkeleton from "component/authentication/Welcome/atom/SearchLoadingSkeleton"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import NoImageFound from "assets/no_image_found.png"
const UniversityList = ({
  handleUniversitySelect,
  popoverOpen,
  setPopoverOpen
}) => {
  const popover = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getUniversitites = async () => {
    setIsLoading(true)
    try {
      const res = await authInstance.get(
        `${universityServer}/keyword/schoolname/${searchTerm.trim()}/5`
      )
      setResults(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInput = () => {
    getUniversitites()
  }

  useDebouncedEffect(handleInput, [searchTerm], 2000)

  return (
    <IonPopover
      ref={popover}
      isOpen={popoverOpen}
      onDidDismiss={() => setPopoverOpen(false)}
      style={{
        height: "300px"
      }}
    >
      <section className="w-full h-full">
        <div className="sticky top-0 flex items-center gap-1 border bg-white rounded-none">
          <IonIcon
            icon={arrowBackOutline}
            className="text-xl text-neutral-400 hover:text-neutral-600 p-2"
            onClick={() => setPopoverOpen(false)}
          />
          <IonInput
            label="Default input"
            showCancelButton="always"
            placeholder="Search University..."
            autofocus
            className="h-8 w-full ion-no-margin text-xs font-normal ion-no-padding border-none"
            value={searchTerm}
            onIonInput={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        </div>

        <div className="h-full">
          {isLoading && <SearchLoadingSkeleton />}

          {!isLoading &&
            results?.length > 0 &&
            results?.map((result, index) => (
              <IonItem
                key={index}
                className="ion-no-padding ion-no-margin px-1 cursor-pointer"
                onClick={() => {
                  handleUniversitySelect(result.name)
                  setPopoverOpen(false)
                }}
              >
                {result.picture ? (
                  <ImageWithLoader
                    src={result.picture}
                    className={"w-10 h-10 rounded-sm"}
                    alt={result.name}
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-sm"
                    src={NoImageFound}
                    alt={result.name}
                  />
                )}
                <span className="px-1 text-xs capitalize leading-4 font-medium text-neutral-600">
                  {result?.name}
                </span>
              </IonItem>
            ))}

          {!isLoading && results?.length === 0 && (
            <div className="h-44 flex justify-center items-center">
              <h3 className="text-neutral-600">No result found</h3>
            </div>
          )}

          {!isLoading && !results && (
            <div className="h-44 flex justify-center text-sm items-center">
              <h3 className="text-neutral-600">Search for a university</h3>
            </div>
          )}
        </div>
      </section>
    </IonPopover>
  )
}

export default UniversityList
