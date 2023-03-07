import {
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonLabel,
  IonRange,
  IonSelect,
  IonSelectOption
} from "@ionic/react"
import "../../uniSearchResults/Filter/index.css"

function index() {
  return (
    <IonCard className="filter-card-wrapper">
      <IonCardContent>
        <div className="search-control">
          <h2 className="search-control__label">College Type</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>4 Year</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Private</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Public</IonLabel>
          </div>

          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>2 Year</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Community</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Trade/career</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Other</IonLabel>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Majors</h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="Any">Any</IonSelectOption>
              <IonSelectOption value="Agricultural Science">
                Agricultural Science
              </IonSelectOption>
              <IonSelectOption value="Art">Art</IonSelectOption>
              <IonSelectOption value="Architecture">
                Architecture
              </IonSelectOption>
            </IonSelect>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Online friendliness</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Fully online</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Large online program</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Some online degrees</IonLabel>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Cost (net price)</h2>
          <IonLabel>Select a value</IonLabel>
          <IonRange pin={true} pinFormatter={(value) => `${value}%`}></IonRange>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Student body size</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Small</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Medium</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Large</IonLabel>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Specialty</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Liberal arts</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>All-women</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>All-men</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>HBCU</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Hispanic-serving institutions</IonLabel>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Test scores</h2>
          <IonLabel>SAT:</IonLabel>
          <IonRange pin={true} pinFormatter={(value) => `${value}%`}></IonRange>
          <IonLabel>ACT:</IonLabel>
          <IonRange pin={true} pinFormatter={(value) => `${value}%`}></IonRange>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Admission process</h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="any">Any</IonSelectOption>
              <IonSelectOption value="No Application Fee">
                No Application Fee
              </IonSelectOption>
              <IonSelectOption value="Accepts Common App">
                Accepts Common App
              </IonSelectOption>
              <IonSelectOption value="Test-Optional">
                Test-Optional
              </IonSelectOption>
              <IonSelectOption value="Offers Early Decision">
                Offers Early Decision
              </IonSelectOption>
              <IonSelectOption value="Offers Early Action">
                Offers Early Action
              </IonSelectOption>
              <IonSelectOption value="Rolling Admission">
                Rolling Admission
              </IonSelectOption>
            </IonSelect>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Selectivity</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Extremely selective</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Very selective</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Selective</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Average</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Not selective</IonLabel>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Religious affiliation</h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="any">Any</IonSelectOption>
              <IonSelectOption value="catholic">Catholid</IonSelectOption>
              <IonSelectOption value="christian">Christian</IonSelectOption>
              <IonSelectOption value="jewish">Jewish</IonSelectOption>
            </IonSelect>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Good for</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Veterans</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>International students</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Adult learners</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Low-income students</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Middle-class students</IonLabel>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">
            Starting salary after graduation
          </h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="any">Any</IonSelectOption>
              <IonSelectOption value="$65,000+">$65,000+</IonSelectOption>
              <IonSelectOption value="$55,000+">$55,000+</IonSelectOption>
              <IonSelectOption value="$45,000+">$45,000+</IonSelectOption>
              <IonSelectOption value="$35,000+">$35,000+</IonSelectOption>
              <IonSelectOption value="$25,000+">$25,000+</IonSelectOption>
            </IonSelect>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default index
