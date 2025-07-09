import emailjs from '@emailjs/browser';

const REQUIRED_ENV_VARS = {
    USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
};

// Validate environment variables
Object.entries(REQUIRED_ENV_VARS).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

// Initialize EmailJS
emailjs.init(REQUIRED_ENV_VARS.USER_ID);

const formatAcademicData = (data) => {
    return data.map(subject => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${subject.subject}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${subject.marks}%</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${subject.attendance}%</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${subject.assessment}%</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${subject.patScore}</td>
        </tr>
    `).join('');
};

export const sendAcademicData = async (studentData) => {
    try {
        const response = await emailjs.send(
            REQUIRED_ENV_VARS.SERVICE_ID,
            REQUIRED_ENV_VARS.TEMPLATE_ID,
            {
                to_email: studentData.parentEmail,
                student_name: studentData.name,
                roll_number: studentData.rollNumber,
                academic_data: `
                    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
                        <div style="background: linear-gradient(to right, #6366f1, #8b5cf6); padding: 24px; color: white; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; font-size: 24px;">Academic Performance Report</h1>
                            <p style="margin: 8px 0 0 0; opacity: 0.9;">Generated on ${new Date().toLocaleDateString()}</p>
                        </div>
                        
                        <div style="padding: 24px; background-color: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            <div style="margin-bottom: 24px;">
                                <h2 style="color: #4b5563; font-size: 18px; margin: 0 0 8px 0;">Student Information</h2>
                                <p style="color: #6b7280; margin: 0;">Name: ${studentData.name}</p>
                                <p style="color: #6b7280; margin: 4px 0 0 0;">Roll Number: ${studentData.rollNumber}</p>
                            </div>
                            
                            <div style="margin-bottom: 24px;">
                                <h2 style="color: #4b5563; font-size: 18px; margin: 0 0 16px 0;">Academic Performance</h2>
                                <table style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 8px;">
                                    <thead>
                                        <tr style="background-color: #f3f4f6;">
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Subject</th>
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Marks</th>
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Attendance</th>
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Assessment</th>
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">PAT Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${formatAcademicData(studentData.academicData)}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div style="color: #6b7280; font-size: 14px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0;">This is an automated email sent by the Student Academic Portal.</p>
                                <p style="margin: 4px 0 0 0;">Please do not reply to this email.</p>
                            </div>
                        </div>
                    </div>
                `,
                date: new Date().toLocaleDateString()
            },
            REQUIRED_ENV_VARS.USER_ID
        );

        return response.status === 200;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};