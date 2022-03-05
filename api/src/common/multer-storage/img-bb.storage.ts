const got = require('got');
const FormData = require('form-data');

export class ImgBBStorage {
  constructor(private config) {}

  _handleFile(req, file, cb) {
    const buffers = [];

    file.stream.on('data', data => buffers.push(data));
    file.stream.on('end', async () => {
      const buffer = Buffer.concat(buffers);

      const form = new FormData();
      form.append('key', this.config().imgBBApiKey);
      form.append('image', buffer.toString('base64'));

      const options = {
        method: 'POST',
        body: form,
        responseType: 'json',
      };

      const response = await got('https://api.imgbb.com/1/upload', options);

      cb(null, response.body.data);
    });
  }

  _removeFile(req, file, cb) {
    cb(null);
  }
}
