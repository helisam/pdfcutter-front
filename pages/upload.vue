<template>
    <v-container grid-list-md text-xs-center fill-height>
        <v-overlay v-show="overlay === true" :model-value="!overlay" class="align-center justify-center">
            <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-layout row wrap align-center>
            <v-flex xs6 offset-xs3>
                <v-text-field v-model="fileName" name="pdf" outline background-color="d8dcd6" color="blue"
                    label="Selecione o pdf" @click="selectFile" />
                <input ref="pdf" class="hide-input" type="file" accept="application/pdf" @change="fileSelected">
                <v-btn class="upload-button" color="121212" @click="upload_file">
                    Enviar
                    <v-icon right color="white">
                    </v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
  
<script>
import uploadService from '@/services/uploadService.js';

export default {
    name: 'FileUpload',
    data() {
        return {
            pdf: '',
            fileName: '',
            overlay: true
        };
    },

    methods: {
        selectFile() {
            this.pdf = this.$refs.pdf.click()
        },
        async forceFileDownload(response) {
            let blob = await new Blob([response.data], {
                type: 'application/zip',
            });
            let title = new Date().getTime();
            let link = document.createElement('a');
            link.download = `${title}.zip`;
            link.href = window.URL.createObjectURL(blob);
            link.click();
            window.URL.revokeObjectURL(link.href);
            this.overlay = false;
        },
        async uploadFile(formData) {
            try {
                this.overlay = true;
                let file = new FormData();
                file.append('file', formData);
                let response = await uploadService.Upload.upload(file);

                if (response.status === 200) {
                    this.forceFileDownload(response, new Date().getTime())
                    // this.$refs.tableStatus.$emit('refresh');
                    // this.$refs.myVueDropzone.removeFile(formData);
                }
            } catch (e) {
                this.failed();
            }
        },
        fileSelected(e) {
            this.$emit('input', e.target.files[0])
            this.pdf = this.$refs.pdf.files[0]
            this.fileName = this.pdf.name
        },
        async upload_file() {
            await this.uploadFile(this.pdf)
        }
    },
    mounted() {
        this.overlay = false;
    },
}
</script>
  
<style scoped>
.hide-input {
    display: none;
}

* {
    text-transform: none !important;
}

.upload-button {
    border-radius: 50px;
    color: white;
}
</style>