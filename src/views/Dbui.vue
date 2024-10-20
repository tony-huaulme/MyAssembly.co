<template>
    <div class="card">
        <DataTable :value="users" tableStyle="min-width: 50rem">
            <Column field="id" header="Id"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="username" header="User Name"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const users = ref([
  {
    "email": "frontend-form@gmai.oms",
    "id": 49,
    "username": null
  },
  {
    "email": "frontend-form@gmai.oma",
    "id": 50,
    "username": null
  },
  {
    "email": "project_user_DXmBCf@example.com",
    "id": 9,
    "username": "project_user"
  },
  {
    "email": "shared_user_yPmH76@example.com",
    "id": 10,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_bz4Asg@example.com",
    "id": 11,
    "username": "file3d_user"
  },
  {
    "email": "project_user_bGLGFt@example.com",
    "id": 12,
    "username": "project_user"
  },
  {
    "email": "shared_user_YPwSYa@example.com",
    "id": 13,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_wVcm3F@example.com",
    "id": 14,
    "username": "file3d_user"
  },
  {
    "email": "project_user_4SKn20@example.com",
    "id": 15,
    "username": "project_user"
  },
  {
    "email": "shared_user_L5XZtJ@example.com",
    "id": 16,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_flmRDJ@example.com",
    "id": 17,
    "username": "file3d_user"
  },
  {
    "email": "joraaaaasqdaaaaaaaan@sssexdample.com",
    "id": 18,
    "username": null
  },
  {
    "email": "test_user_KDOEet@example.com",
    "id": 19,
    "username": "updated_user"
  },
  {
    "email": "project_user_6OksYz@example.com",
    "id": 20,
    "username": "project_user"
  },
  {
    "email": "shared_user_JRWZDZ@example.com",
    "id": 21,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_gRAIfz@example.com",
    "id": 22,
    "username": "file3d_user"
  },
  {
    "email": "test_user_pZOKu5@example.com",
    "id": 23,
    "username": "updated_user"
  },
  {
    "email": "project_user_eJFxPS@example.com",
    "id": 24,
    "username": "project_user"
  },
  {
    "email": "shared_user_wYwUr3@example.com",
    "id": 25,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_DqwvHq@example.com",
    "id": 26,
    "username": "file3d_user"
  },
  {
    "email": "test_user_aLljbf@example.com",
    "id": 27,
    "username": "updated_user"
  },
  {
    "email": "project_user_h5tSA6@example.com",
    "id": 28,
    "username": "project_user"
  },
  {
    "email": "shared_user_o317PG@example.com",
    "id": 29,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_1yDzI4@example.com",
    "id": 30,
    "username": "file3d_user"
  },
  {
    "email": "test_user_LFoe6z@example.com",
    "id": 31,
    "username": "updated_user"
  },
  {
    "email": "project_user_lTEA83@example.com",
    "id": 32,
    "username": "project_user"
  },
  {
    "email": "shared_user_x14WPx@example.com",
    "id": 33,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_GUkYZT@example.com",
    "id": 34,
    "username": "file3d_user"
  },
  {
    "email": "test_user_5E7mp4@example.com",
    "id": 35,
    "username": "updated_user"
  },
  {
    "email": "project_user_6IZ3YA@example.com",
    "id": 36,
    "username": "project_user"
  },
  {
    "email": "shared_user_aIvOR1@example.com",
    "id": 37,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_zofVEd@example.com",
    "id": 38,
    "username": "file3d_user"
  },
  {
    "email": "test_user_lsZBfZ@example.com",
    "id": 39,
    "username": "updated_user"
  },
  {
    "email": "project_user_JS5fum@example.com",
    "id": 41,
    "username": "project_user"
  },
  {
    "email": "test_user_6Pkogl@example.com",
    "id": 40,
    "username": "updated_user"
  },
  {
    "email": "project_user_NjLaFz@example.com",
    "id": 42,
    "username": "project_user"
  },
  {
    "email": "shared_user_503PUt@example.com",
    "id": 43,
    "username": "shared_user"
  },
  {
    "email": "shared_user_8ovuu4@example.com",
    "id": 44,
    "username": "shared_user"
  },
  {
    "email": "file3d_user_ah6OPk@example.com",
    "id": 45,
    "username": "file3d_user"
  },
  {
    "email": "file3d_user_hKbHae@example.com",
    "id": 46,
    "username": "file3d_user"
  },
  {
    "email": "sssssssssssssssssssn@sssexdample.com",
    "id": 47,
    "username": null
  },
  {
    "email": "front-cobnsoele@sssexdample.com",
    "id": 48,
    "username": null
  },
  {
    "email": "frontend-form@gmai.omq",
    "id": 51,
    "username": null
  },
  {
    "email": "tynocraft@gmail.com",
    "id": 52,
    "username": "tyno craft"
  },
  {
    "email": "tonyhuaulme@gmail.com",
    "id": 53,
    "username": "tony huaulme"
  },
  {
    "email": "tony@sweelco.com",
    "id": 54,
    "username": "Tony Huaulme"
  },
  {
    "email": "tony@tony.tony",
    "id": 55,
    "username": null
  },
  {
    "email": "raichounoscope@gmail.com",
    "id": 56,
    "username": "LEESINGOOD"
  },
  {
    "email": "tony1@tony1.tony1",
    "id": 57,
    "username": null
  },
  {
    "email": "atony@tony.tony",
    "id": 58,
    "username": null
  },
  {
    "email": "aqtony@tony.tony",
    "id": 59,
    "username": null
  },
  {
    "email": "huaulme.tony.pro@gmail.com",
    "id": 60,
    "username": "Tony HUAULME"
  },
  {
    "email": "tynoroller@gmail.com",
    "id": 61,
    "username": "tyno roller"
  },
  {
    "email": "ouipolm897@gmail.com",
    "id": 62,
    "username": "oui po"
  },
  {
    "email": "crreeps@gmail.com",
    "id": 63,
    "username": "tony huaulm\u00e9"
  },
  {
    "email": "veerababuadapa5050@gmail.com",
    "id": 64,
    "username": "Veera Babu"
  }
]);

import api from '@/services/api';
onMounted(() => {
    // api.get('/users').then((res) => {
    //   users.value = res.data;
    // });
});

</script>