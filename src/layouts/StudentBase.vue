<template>
  <q-layout view="lHh lpr fFf">

    <q-layout-header class="bg-primary ht300 no-shadow">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
          v-show="!leftDrawer"
        />
        <q-toolbar-title>
          <span class="text-weight-bold text-white q-headline">
            TOK<span class="font-secondary text-weight-medium">I</span>DO
          </span>
          <span class="flex"></span>

        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
    >
      <div class="bg-primary ht300 text-white row items-end justify-end content-end">
        <q-btn
          flat
          round
          icon="menu"
          @click="leftDrawer = !leftDrawer"
          v-show="leftDrawer"
          class="fixed self-start"
          style="left: 0px;"
        />
        <div class="col">
          <div class="col justify-center row align-center items-center">
            <q-knob
              v-model="mastery"
              :min="min"
              :max="max"
              size="140px"
              readonly
              color="secondary"
              track-color="blue-10"
              class="absolute"
            />
            <div class="avatar q-display-3 bg-light row items-center justify-center q-my-sm">ZN</div>
          </div>
          <div class="q-headline text-center q-pa-sm">
            ZAC NORTON
          </div>
          <div class="font-secondary q-caption text-center q-mb-lg">
            MASTERY LEVEL 25
          </div>
        </div>
      </div>
      <q-list no-border link separator>
        <q-item>
          <q-item-main label="DASHBOARD" class="font-secondary q-caption text-center text-bold text-grey" />
        </q-item>
        <q-item>
          <q-item-main label="LEARN" class="font-secondary q-caption text-center text-bold text-grey" />
        </q-item>
        <q-item>
          <q-item-main label="TESTS" class="font-secondary q-caption text-center text-bold text-grey" />
        </q-item>
        <q-item>
          <q-item-main label="WORDBANK" class="font-secondary q-caption text-center text-bold text-grey" />
        </q-item>
        <q-item>
          <q-item-main label="MY COURSES" class="font-secondary q-caption text-center text-bold text-grey" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view class="mainup" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'StudentBase',
  data () {
    return {
      leftDrawer: true,
      min: 0,
      max: 100,
      mastery: 25
    }
  }
}
</script>

<style>
.ht300 {
  height: 300px;
}
.avatar {
  height: 120px;
  width:  120px;
  border-radius: 50%;
  z-index: 1;
}
.mainup{
  z-index: 2999;
  margin-top: -250px;
  height: calc(100vh - 50px);
}
</style>
