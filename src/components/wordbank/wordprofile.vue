<template>
  <div class="col">
    <q-card class="tk-container-sub collapse">
      <q-card-title class="title-bar-grey text-center">
        <h4>WORD PROFILE</h4>
      </q-card-title>
      <q-card-main class="col tk-container-sub-inner">
        <div class="col">
          <div class="col">
            <h6 class="sub-title-blue q-pb-sm">WORD</h6>
            <p class="primary-font text-bold q-display-1 text-black">Deteriorate</p>
          </div>
          <div class="col">
            <h6 class="sub-title-blue q-pb-sm">MEANING</h6>
            <div class="primary-font text-bold text-black">
              <p>
                1. to make or become worse or inferior in character, quality, value, etc.
              </p>
              <p>
                2. to disintegrate or wear away.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h6 class="sub-title-blue q-pb-sm">SYNONYMS</h6>
              <div class="primary-font text-bold text-black">
                <p>
                  abase, cheapen, corrupt, debase,debauch, degrade, demean, demoralize, deprave,
                  lessen, pervet, poision, profane, prostitute, subvert, vitiate, warp
                </p>
              </div>
            </div>
            <div class="col">
              <h6 class="sub-title-blue q-pb-sm">ANTONYMS</h6>
              <div class="primary-font text-bold text-black">
                <p>
                  elevate, ennoble, uplift
                </p>
              </div>
            </div>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <q-card class="tk-container-sub collapse">
      <q-card-title class="title-bar-grey text-center">
        <h4>WORD MAP</h4>
      </q-card-title>
      <q-card-main class="col tk-container-sub-inner">
        <div class="col">
          WORD MAP
        </div>
      </q-card-main>
      <q-card-actions align="center" class="row">
        <q-btn
          color="primary"
          text-color="white"
          label="UPDATE MAP"
          class="col"
        />
        <q-btn
          color="secondary"
          text-color="white"
          label="REDO MAP"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
</style>
