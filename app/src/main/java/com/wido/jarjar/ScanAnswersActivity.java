package com.wido.jarjar;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.vision.CameraSource;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.MultiProcessor;
import com.google.android.gms.vision.Tracker;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;
import com.google.android.gms.vision.face.Face;
import com.google.android.gms.vision.face.FaceDetector;
import com.wido.jarjar.camera.CameraSourcePreview;
import com.wido.jarjar.camera.GraphicOverlay;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ScanAnswersActivity extends AppCompatActivity {
    private static final String TAG = "FaceTracker";

    private CameraSource mCameraSource = null;

    private CameraSourcePreview mPreview;
    private GraphicOverlay mGraphicOverlay;

    private static final int RC_HANDLE_GMS = 9001;
    // permission request codes need to be < 256
    private static final int RC_HANDLE_CAMERA_PERM = 2;


    //Counting the answers -- Variables
    public int counterA = 0;
    public int counterB = 0;
    public int counterC = 0;
    public int counterD = 0;
    public int counterTotal = 0;

    public TextView scannedBarcodesOnScreen;
    public Button buttonSubmit;

    //==============================================================================================
    // Activity Methods
    //==============================================================================================

    /**
     * Initializes the UI and initiates the creation of a face detector.
     */
    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        setContentView(R.layout.activity_scan_answers);

        mPreview = (CameraSourcePreview) findViewById(R.id.preview);
        mGraphicOverlay = (GraphicOverlay) findViewById(R.id.faceOverlay);

        buttonSubmit = (Button)findViewById(R.id.btnSendResults);
        scannedBarcodesOnScreen = (TextView)findViewById(R.id.barcodeCounterTextview);


        // Check for the camera permission before accessing the camera.  If the
        // permission is not granted yet, request permission.
        int rc = ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA);
        if (rc == PackageManager.PERMISSION_GRANTED) {
            createCameraSource();
        } else {
            requestCameraPermission();
        }

        // Setting variables
        counterA = 0;
        counterB = 0;
        counterC = 0;
        counterD = 0;
        counterTotal = 0;


        //Button Send all the results
        final Button sendResultsBtn = (Button) findViewById(R.id.btnSendResults);
        sendResultsBtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                //Post for results

                String urlPost = "http://192.168.0.178:3000/Results";
                //String urlPost = "http://10.42.0.1:3000/Results";

                final String answer1 = String.valueOf(counterA);
                final String answer2 = String.valueOf(counterB);
                final String answer3 = String.valueOf(counterC);
                final String rightAnswer = String.valueOf(counterD);

                final String noAnswer = String.valueOf(counterB);
                final String yesAnswer = String.valueOf(counterA);

                StringRequest postRequest = new StringRequest(Request.Method.POST, urlPost,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    JSONObject jsonResponse = new JSONObject(response).getJSONObject("form");

//                                    String site = jsonResponse.getString("site");
//                                    String network = jsonResponse.getString("network");
//                                    System.out.println("Site: "+site+"\nNetwork: "+network +"hello");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                error.printStackTrace();
                            }
                        }
                ) {

                    @Override
                    protected Map<String, String> getParams()
                    {
                        Intent intent = getIntent();
                        Bundle mBundle = intent.getExtras();
                        String contextAnswer = (String)mBundle.get("ContextAnswer");

                        //final TextView answerView = (TextView) findViewById(R.id.answerView);
                        //String contextAnswer = answerView.getText().toString();
                        if (contextAnswer.equals("Yes") || contextAnswer.equals("No"))
                        {
                            Map<String, String> params = new HashMap<>();
                            params.put("No", noAnswer);
                            params.put("Yes", yesAnswer);
                            return params;
                        }else
                        {
                            Map<String, String> params = new HashMap<>();
                            // the POST parameters:
                            params.put("Answer1", answer1);
                            params.put("Answer2", answer2);
                            params.put("Answer3", answer3);
                            params.put("RightAnswer", rightAnswer);
                            return params;
                        }
                    }
                };
                Volley.newRequestQueue(ScanAnswersActivity.this).add(postRequest);
            }
        });
    }

    /**
     * Handles the requesting of the camera permission.  This includes
     * showing a "Snackbar" message of why the permission is needed then
     * sending the request.
     */
    private void requestCameraPermission() {
        Log.w(TAG, "Camera permission is not granted. Requesting permission");

        final String[] permissions = new String[]{Manifest.permission.CAMERA};

        if (!ActivityCompat.shouldShowRequestPermissionRationale(this,
                Manifest.permission.CAMERA)) {
            ActivityCompat.requestPermissions(this, permissions, RC_HANDLE_CAMERA_PERM);
            return;
        }

        final Activity thisActivity = this;

        View.OnClickListener listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ActivityCompat.requestPermissions(thisActivity, permissions,
                        RC_HANDLE_CAMERA_PERM);
            }
        };

        Snackbar.make(mGraphicOverlay, R.string.permission_camera_rationale,
                Snackbar.LENGTH_INDEFINITE)
                .setAction(R.string.ok, listener)
                .show();
    }

    /**
     * Creates and starts the camera.  Note that this uses a higher resolution in comparison
     * to other detection examples to enable the barcode detector to detect small barcodes
     * at long distances.
     */
    private void createCameraSource() {

        Context context = getApplicationContext();

        /*FaceDetector detector = new FaceDetector.Builder(context)
                .setClassificationType(FaceDetector.ALL_CLASSIFICATIONS)
                .build();

        detector.setProcessor(
                new MultiProcessor.Builder<>(new GraphicFaceTrackerFactory()).build());*/


        // A barcode detector is created to track barcodes.  An associated multi-processor instance
        // is set to receive the barcode detection results, track the barcodes, and maintain
        // graphics for each barcode on screen.  The factory is used by the multi-processor to
        // create a separate tracker instance for each barcode.
        BarcodeDetector detector = new BarcodeDetector.Builder(context).build();
        detector.setProcessor(
                new MultiProcessor.Builder<>(new GraphicBarcodeTrackerFactory()).build()
        );

        if (!detector.isOperational()) {
            // Note: The first time that an app using face API is installed on a device, GMS will
            // download a native library to the device in order to do detection.  Usually this
            // completes before the app is run for the first time.  But if that download has not yet
            // completed, then the above call will not detect any faces.
            //
            // isOperational() can be used to check if the required native library is currently
            // available.  The detector will automatically become operational once the library
            // download completes on device.
            Log.w(TAG, "Detector dependencies are not yet available.");
        }

        mCameraSource = new CameraSource.Builder(context, detector)
                .setRequestedPreviewSize(640, 480)
                .setFacing(CameraSource.CAMERA_FACING_BACK)
                .setRequestedFps(30.0f)
                .setAutoFocusEnabled(true)
                .build();
    }

    /**
     * Restarts the camera.
     */
    @Override
    protected void onResume() {
        super.onResume();

        startCameraSource();
    }

    /**
     * Stops the camera.
     */
    @Override
    protected void onPause() {
        super.onPause();
        mPreview.stop();
    }

    /**
     * Releases the resources associated with the camera source, the associated detector, and the
     * rest of the processing pipeline.
     */
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mCameraSource != null) {
            mCameraSource.release();
        }
    }

    /**
     * Callback for the result from requesting permissions. This method
     * is invoked for every call on {@link #requestPermissions(String[], int)}.
     * <p>
     * <strong>Note:</strong> It is possible that the permissions request interaction
     * with the user is interrupted. In this case you will receive empty permissions
     * and results arrays which should be treated as a cancellation.
     * </p>
     *
     * @param requestCode  The request code passed in {@link #requestPermissions(String[], int)}.
     * @param permissions  The requested permissions. Never null.
     * @param grantResults The grant results for the corresponding permissions
     *                     which is either {@link PackageManager#PERMISSION_GRANTED}
     *                     or {@link PackageManager#PERMISSION_DENIED}. Never null.
     * @see #requestPermissions(String[], int)
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode != RC_HANDLE_CAMERA_PERM) {
            Log.d(TAG, "Got unexpected permission result: " + requestCode);
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
            return;
        }

        if (grantResults.length != 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            Log.d(TAG, "Camera permission granted - initialize the camera source");
            // we have permission, so create the camerasource
            createCameraSource();
            return;
        }

        Log.e(TAG, "Permission not granted: results len = " + grantResults.length +
                " Result code = " + (grantResults.length > 0 ? grantResults[0] : "(empty)"));

        DialogInterface.OnClickListener listener = new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                finish();
            }
        };

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Face Tracker sample")
                .setMessage(R.string.no_camera_permission)
                .setPositiveButton(R.string.ok, listener)
                .show();
    }

    //==============================================================================================
    // Camera Source Preview
    //==============================================================================================

    /**
     * Starts or restarts the camera source, if it exists.  If the camera source doesn't exist yet
     * (e.g., because onResume was called before the camera source was created), this will be called
     * again when the camera source is created.
     */
    private void startCameraSource() {

        // check that the device has play services available.
        int code = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(
                getApplicationContext());
        if (code != ConnectionResult.SUCCESS) {
            Dialog dlg =
                    GoogleApiAvailability.getInstance().getErrorDialog(this, code, RC_HANDLE_GMS);
            dlg.show();
        }

        if (mCameraSource != null) {
            try {
                mPreview.start(mCameraSource, mGraphicOverlay);
            } catch (IOException e) {
                Log.e(TAG, "Unable to start camera source.", e);
                mCameraSource.release();
                mCameraSource = null;
            }
        }
    }

    //==============================================================================================
    // Graphic Face Tracker
    //==============================================================================================



    /**
     * Factory for creating a barcode tracker to be associated with a new barcode.  The multiprocessor
     * uses this factory to create barcode trackers as needed.
     */
    private class GraphicBarcodeTrackerFactory implements MultiProcessor.Factory<Barcode>{
        @Override
        public Tracker<Barcode> create(Barcode barcode){
            return new GraphicBarcodeTracker(mGraphicOverlay);
        }
    }

    /**
     * Barcode tracker for each detected barcode. This maintains a barcode graphic within the app's associated barcode overlay.
     */
    private class GraphicBarcodeTracker extends Tracker<Barcode>{
        private GraphicOverlay mOverlay;
        private BarcodeGraphic mBarcodeGraphic;

        GraphicBarcodeTracker(GraphicOverlay overlay){
            mOverlay = overlay;
            mBarcodeGraphic = new BarcodeGraphic(overlay);
        }


        /**
         * Start tracking the detected item instance within the item overlay.
         */
        @Override
        public void onNewItem(int barcodeId, Barcode item) {
            mBarcodeGraphic.setId(barcodeId);
            Log.d("BARCODE DETECTED", item.rawValue);
            barcodeAnswerCounterUp(item.rawValue);
        }

        /**
         * Update the position/characteristics of the item within the overlay.
         */
        @Override
        public void onUpdate(BarcodeDetector.Detections<Barcode> detectionResults, Barcode barcode) {
            mOverlay.add(mBarcodeGraphic);
            mBarcodeGraphic.updateItem(barcode);
        }


        /**
         * Hide the graphic when the corresponding face was not detected.  This can happen for
         * intermediate frames temporarily, for example if the face was momentarily blocked from
         * view.
         */
        @Override
        public void onMissing(BarcodeDetector.Detections<Barcode> detectionResults) {
            mOverlay.remove(mBarcodeGraphic);
        }

        /**
         * Called when the item is assumed to be gone for good. Remove the graphic annotation from
         * the overlay.
         */
        @Override
        public void onDone() {
            mOverlay.remove(mBarcodeGraphic);
            barcodeAnswerCounterDown(mBarcodeGraphic.getBarcode().rawValue);
        }
    }

    // Function that adds value to answercounters
    private void barcodeAnswerCounterUp(String barcodeValue){
        switch (barcodeValue){
            case "Answer A":
                counterA++;
                setCounterTextView();
                break;
            case "Answer B":
                counterB++;
                setCounterTextView();
                break;
            case "Answer C":
                counterC++;
                setCounterTextView();
                break;
            case "Answer D":
                counterD++;
                setCounterTextView();
                break;
            default:
                break;
        }
    }

    // Function that adds value to answercounters
    private void barcodeAnswerCounterDown(String barcodeValue){
        switch (barcodeValue){
            case "Answer A":
                counterA--;
                setCounterTextView();
                break;
            case "Answer B":
                counterB--;
                setCounterTextView();
                break;
            case "Answer C":
                counterC--;
                setCounterTextView();
                break;
            case "Answer D":
                counterD--;
                setCounterTextView();
                break;
            default:
                break;
        }
    }

    // Edit Textview
    private void setCounterTextView(){
        counterTotal = counterA + counterB + counterC + counterD;

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                scannedBarcodesOnScreen.setText("Barcodes Counted: " + counterTotal);
            }
        });
    }

    /*
    _____________________________________________________
    //Basic google vision tutorial! (Scans the QR code from a picture when you push the
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan_answers);


        Button btn = (Button) findViewById(R.id.button);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            }
        });

        ImageView myImageView = (ImageView) findViewById(R.id.imgview);
        Bitmap myBitmap = BitmapFactory.decodeResource(
                getApplicationContext().getResources(),
                R.drawable.puppy);
        myImageView.setImageBitmap(myBitmap);


        Frame frame = new Frame.Builder().setBitmap(myBitmap).build();



        TextView txtView = (TextView) findViewById(R.id.txtContent);

        BarcodeDetector detector = new BarcodeDetector.Builder(getApplicationContext()).setBarcodeFormats(Barcode.DATA_MATRIX | Barcode.QR_CODE).build();
        if(!detector.isOperational()){
            txtView.setText("Could not set up the detector!");
            return;
        }
        SparseArray<Barcode> barcodes = detector.detect(frame);
        Barcode thisCode = barcodes.valueAt(0);

        txtView.setText(thisCode.rawValue);



    }
    */
}
